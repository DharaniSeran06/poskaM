# Job Application Form - Sanity CMS Setup Guide

This guide explains how the job application form stores data in Sanity CMS (no email functionality).

## 📁 File Structure

```
src/
├── sanity/
│   ├── schemaTypes/
│   │   └── jobApplicationType.ts      # Sanity schema definition
│   └── lib/
│       └── writeClient.ts             # Server-side write client (already exists)
├── app/
│   ├── api/
│   │   └── job-application/
│   │       └── route.ts               # API route (UPDATED - no email)
│   └── components/
│       └── job-application/
│           └── form.tsx               # Form component (UPDATED - includes language)
```

## 🔐 Environment Variables

Ensure these are set in `.env.local`:

```env
# Public Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-02

# Server-side Write Token (REQUIRED)
SANITY_WRITE_TOKEN=your-write-token-here
# OR
SANITY_API_WRITE_TOKEN=your-write-token-here
```

**Note**: The API route accepts both `SANITY_WRITE_TOKEN` and `SANITY_API_WRITE_TOKEN` for compatibility.

## 📋 Sanity Schema

The `jobApplication` schema includes:

- **fullName** (string, required): Applicant's full name
- **email** (string, required): Valid email address
- **phone** (string, optional): Phone number
- **position** (string, required): Position applied for
- **message** (text, optional): Cover letter or message
- **resume** (file, required): Uploaded resume file (PDF or DOCX)
- **language** (string, required): "en" or "de"
- **submittedAt** (datetime, auto): Submission timestamp

### File Upload Support:
- **Accepted Types**: PDF (.pdf), DOC (.doc), DOCX (.docx)
- **Max Size**: 5MB
- **Storage**: Files are uploaded to Sanity as file assets

## 🔒 Security Features

1. **Server-Side Only**: Write token is never exposed to the client
2. **API Route Protection**: All writes happen through `/api/job-application` route
3. **Input Validation**: Server-side validation before writing to Sanity
4. **File Validation**: File type and size validation
5. **Rate Limiting**: Prevents spam (3 submissions per 15 minutes per email/IP)
6. **Honeypot Field**: Spam prevention using hidden "website" field

## 🚀 How It Works

1. User fills out the job application form
2. Form submits to `/api/job-application` (POST request with FormData)
3. API route validates:
   - Required fields (fullName, email, position)
   - Email format
   - Phone format (if provided)
   - File type and size
   - Language (en/de)
4. Resume file is uploaded to Sanity as a file asset
5. All form data is stored in Sanity as a `jobApplication` document
6. Success/error response sent back to client
7. Form shows success message or error

## 📝 Form Component Updates

The form component (`src/app/components/job-application/form.tsx`) now:
- Uses `useLocale()` to detect current language
- Sends language to API route automatically
- Validates file is required before submission
- Shows loading, success, and error states

## 🎨 Sanity Studio

After deploying the schema:

1. Open Sanity Studio
2. You'll see "Job Application" in the document list
3. View submissions ordered by newest first
4. Each entry shows:
   - Name
   - Position
   - Email
   - Language
   - Date
   - Resume file (downloadable)

## ❌ Removed Features

The following have been **completely removed**:
- ❌ Email sending (Resend API)
- ❌ Email sending (Nodemailer)
- ❌ Email sending (FormSubmit.co)
- ❌ All email-related code and dependencies

**All data is now stored ONLY in Sanity CMS.**

## ✅ Testing

1. Start your development server: `npm run dev`
2. Navigate to `/company/careers/apply` or `/en/company/careers/apply`
3. Fill out the form:
   - Enter full name, email, phone, position
   - Upload a PDF or DOCX resume (max 5MB)
   - Optionally add a message
4. Submit and check:
   - Success message appears
   - Data appears in Sanity Studio
   - Resume file is accessible in Sanity
   - Language is correctly stored

## 🐛 Troubleshooting

### "SANITY_WRITE_TOKEN is not configured"
- Check `.env.local` has the token
- Restart your dev server after adding env variables
- Verify token has Editor permissions in Sanity

### "Resume file is required"
- Ensure a file is selected before submitting
- File must be PDF, DOC, or DOCX
- File size must be under 5MB

### "Failed to upload resume file"
- Check Sanity project permissions
- Verify write token has asset upload permissions
- Check file size and type

### Form not submitting
- Check browser console for errors
- Verify API route is accessible at `/api/job-application`
- Check network tab for request/response

## 🔄 Production Deployment

1. Add `SANITY_WRITE_TOKEN` to your hosting platform's environment variables:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **Other**: Follow platform-specific instructions

2. Redeploy your application

3. Test the form in production

## 📚 Related Files

- Schema: `src/sanity/schemaTypes/jobApplicationType.ts`
- Write Client: `src/sanity/lib/writeClient.ts` (already exists)
- API Route: `src/app/api/job-application/route.ts` (UPDATED)
- Form Component: `src/app/components/job-application/form.tsx` (UPDATED)
- Schema Index: `src/sanity/schemaTypes/index.ts` (UPDATED)

---

**Note**: This implementation is production-ready and follows Next.js and Sanity best practices for security and data handling. All data is stored in Sanity CMS only - no emails are sent.
