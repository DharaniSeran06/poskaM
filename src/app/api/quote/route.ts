import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

// Service options mapping
const SERVICE_OPTIONS = [
  'plaster-casts',
  'drywall',
  'painting',
  'facades-and-insulation',
  'customer-masons',
  'architecture',
  'planning',
  'interior',
  'renovation',
  'other',
];

// Language validation
const VALID_LANGUAGES = ['en', 'de'];

interface QuoteRequestBody {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  projectDetails: string;
  language: string;
}

/**
 * Validate quote request data
 */
function validateQuoteRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Full Name validation
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
    errors.push('Full name is required and must be at least 2 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
    errors.push('Valid email address is required');
  }

  // Service validation
  if (!data.service || typeof data.service !== 'string' || !SERVICE_OPTIONS.includes(data.service)) {
    errors.push('Valid service selection is required');
  }

  // Project Details validation
  if (!data.projectDetails || typeof data.projectDetails !== 'string' || data.projectDetails.trim().length < 10) {
    errors.push('Project details are required and must be at least 10 characters');
  }

  // Language validation
  if (!data.language || !VALID_LANGUAGES.includes(data.language)) {
    errors.push('Valid language selection is required (en or de)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * POST /api/quote
 * Handles quote request submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: QuoteRequestBody = await request.json();

    // Validate request data
    const validation = validateQuoteRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check if write token is configured
    if (!(process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN)) {
      console.error('❌ Quote API: Sanity write token is not configured (SANITY_WRITE_TOKEN / SANITY_API_WRITE_TOKEN)');
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
          details:
            process.env.NODE_ENV === 'development'
              ? 'Missing env var SANITY_WRITE_TOKEN (recommended) or SANITY_API_WRITE_TOKEN. Add it to .env.local and restart the dev server.'
              : undefined,
        },
        { status: 500 }
      );
    }

    // Prepare document for Sanity
    const document = {
      _type: 'quoteRequest',
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      service: body.service,
      projectDetails: body.projectDetails.trim(),
      language: body.language,
      createdAt: new Date().toISOString(),
    };

    // Create document in Sanity
    const result = await writeClient.create(document);

    console.log(`✅ Quote request created: ${result._id} (${body.fullName}, ${body.email})`);

    return NextResponse.json(
      {
        success: true,
        message: 'Quote request submitted successfully',
        id: result._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Error creating quote request:', error);

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
        error: 'Failed to submit quote request. Please try again later.',
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
    { error: 'Method not allowed. Use POST to submit quote requests.' },
    { status: 405 }
  );
}
