import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];

// Spam prevention: Rate limiting (simple in-memory store - use Redis in production)
const submissionAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// Language validation
const VALID_LANGUAGES = ['en', 'de'];

interface ApplicationData {
  fullName: string;
  email: string;
  phone?: string;
  position: string;
  message?: string;
  language: string;
  honeypot?: string; // Spam prevention
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Basic phone validation - allows international format
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempt = submissionAttempts.get(identifier);

  if (!attempt) {
    submissionAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Reset if window has passed
  if (now - attempt.lastAttempt > RATE_LIMIT_WINDOW) {
    submissionAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Check if limit exceeded
  if (attempt.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }

  // Increment count
  attempt.count++;
  attempt.lastAttempt = now;
  return true;
}

/**
 * Upload file to Sanity as an asset
 */
async function uploadFileToSanity(file: File): Promise<string> {
  try {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Sanity
    const asset = await writeClient.assets.upload('file', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return asset._id;
  } catch (error: any) {
    console.error('Error uploading file to Sanity:', error);
    throw new Error('Failed to upload resume file');
  }
}

/**
 * POST /api/job-application
 * Handles job application submissions and stores in Sanity CMS
 */
export async function POST(request: NextRequest) {
  try {
    // Check if write token is configured
    const writeToken = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
    if (!writeToken) {
      console.error('❌ Job Application API: SANITY_WRITE_TOKEN is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
          details: process.env.NODE_ENV === 'development' 
            ? 'Missing env var SANITY_WRITE_TOKEN. Add it to .env.local and restart the dev server.'
            : undefined,
        },
        { status: 500 }
      );
    }

    // Parse FormData
    const formData = await request.formData();

    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string;
    const language = (formData.get('language') as string) || 'en';
    const honeypot = formData.get('website') as string; // Spam prevention field

    // Spam prevention: Check honeypot field
    if (honeypot && honeypot !== '') {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!fullName || !email || !position) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: fullName, email, and position are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate phone format (if provided)
    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate language
    if (!VALID_LANGUAGES.includes(language)) {
      return NextResponse.json(
        { success: false, error: 'Invalid language. Must be "en" or "de"' },
        { status: 400 }
      );
    }

    // Rate limiting
    const identifier = `${email}-${request.headers.get('x-forwarded-for') || 'unknown'}`;
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Handle file upload (required)
    const file = formData.get('resume') as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Resume file is required' },
        { status: 400 }
      );
    }

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(file.type) && !ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only PDF and DOC/DOCX files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 5MB limit.' },
        { status: 400 }
      );
    }

    // Upload file to Sanity
    let resumeAssetId: string;
    try {
      resumeAssetId = await uploadFileToSanity(file);
      console.log(`✅ Job Application: Resume uploaded to Sanity: ${resumeAssetId}`);
    } catch (error: any) {
      console.error('❌ Job Application: Failed to upload resume:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to upload resume file. Please try again.' },
        { status: 500 }
      );
    }

    // Prepare document for Sanity
    const document = {
      _type: 'jobApplication',
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      position: position.trim(),
      message: message?.trim() || undefined,
      resume: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: resumeAssetId,
        },
      },
      language: language,
      submittedAt: new Date().toISOString(),
    };

    // Create document in Sanity
    const result = await writeClient.create(document);

    console.log(`✅ Job Application: Created in Sanity: ${result._id} (${fullName}, ${email})`);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      id: result._id,
    });
  } catch (error: any) {
    console.error('❌ Job Application: Error processing application:', error);

    // Handle Sanity-specific errors
    if (error.message?.includes('token')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication failed. Please check server configuration.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit application. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit job applications.' },
    { status: 405 }
  );
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
