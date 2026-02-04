import { NextRequest, NextResponse } from 'next/server';

// Email service configuration
const COMPANY_EMAIL = 'info@poskamanolito.ch';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Spam prevention: Rate limiting (simple in-memory store - use Redis in production)
const submissionAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 3;

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
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

async function sendEmailWithAttachment(
  data: ApplicationData,
  fileBuffer: Buffer | null,
  fileName: string | null,
  fileType: string | null
): Promise<boolean> {
  try {
    // Option 1: Using Resend API (recommended - supports file attachments)
    // Requires: npm install resend
    // Set RESEND_API_KEY in environment variables
    // Get API key from: https://resend.com/api-keys
    
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailContent = `
New Job Application Received

Position: ${data.position || 'Not specified'}

Applicant Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}

Message/Cover Note:
${data.message || 'No message provided'}

---
This email was sent from the POSKA MANOLITO AG job application form.
        `.trim();

        const emailOptions: any = {
          from: process.env.RESEND_FROM_EMAIL || 'Job Applications <onboarding@resend.dev>',
          to: COMPANY_EMAIL,
          subject: `New Job Application – ${data.position || 'General Application'}`,
          text: emailContent,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #016aac;">New Job Application Received</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Position:</strong> ${data.position || 'Not specified'}</p>
                <h3 style="color: #333; margin-top: 20px;">Applicant Details:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Name:</strong> ${data.fullName}</li>
                  <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
                  <li><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></li>
                </ul>
                <h3 style="color: #333; margin-top: 20px;">Message/Cover Note:</h3>
                <p style="white-space: pre-wrap;">${data.message || 'No message provided'}</p>
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                This email was sent from the POSKA MANOLITO AG job application form.
              </p>
            </div>
          `,
        };

        // Attach file if provided
        if (fileBuffer && fileName && fileType) {
          emailOptions.attachments = [
            {
              filename: fileName,
              content: fileBuffer,
            },
          ];
        }

        const result = await resend.emails.send(emailOptions);
        return result.error === null;
      } catch (resendError) {
        console.error('Resend error:', resendError);
        // Fall through to FormSubmit.co fallback
      }
    }

    // Option 2: Using FormSubmit.co (fallback - no file attachments)
    // Note: FormSubmit.co doesn't support file attachments
    // The file information will be included in the email body
    const emailBody = `
New Job Application Received

Position: ${data.position || 'Not specified'}

Applicant Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}

Message/Cover Note:
${data.message || 'No message provided'}

${fileName ? `\n⚠️ Note: A CV file "${fileName}" was uploaded but cannot be attached via this service. Please contact the applicant at ${data.email} to request the CV file.` : ''}

---
This email was sent from the POSKA MANOLITO AG job application form.
    `.trim();

    const response = await fetch('https://formsubmit.co/ajax/info@poskamanolito.ch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: `New Job Application – ${data.position || 'General Application'}`,
        message: emailBody,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse FormData
    const formData = await request.formData();

    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string;
    const honeypot = formData.get('website') as string; // Spam prevention field

    // Spam prevention: Check honeypot field
    if (honeypot && honeypot !== '') {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!fullName || !email || !phone || !position) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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

    // Validate phone format
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
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

    // Handle file upload
    const file = formData.get('resume') as File | null;
    let fileBuffer: Buffer | null = null;
    let fileName: string | null = null;
    let fileType: string | null = null;

    if (file && file.size > 0) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: 'Invalid file type. Only PDF and DOC files are allowed.' },
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

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
      fileName = file.name;
      fileType = file.type;
    }

    // Prepare application data
    const applicationData: ApplicationData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      message: message?.trim() || '',
    };

    // Send email
    const emailSent = await sendEmailWithAttachment(
      applicationData,
      fileBuffer,
      fileName,
      fileType
    );

    if (!emailSent) {
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
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
