# Secure Quote Request Form Setup Guide

This guide explains how to set up the secure "Get a Free Quote" form that submits data to Sanity CMS.

## 📁 File Structure

```
src/
├── sanity/
│   ├── schemaTypes/
│   │   └── quoteRequest.ts          # Sanity schema definition
│   └── lib/
│       └── writeClient.ts           # Server-side write client
├── app/
│   ├── api/
│   │   └── quote/
│   │       └── route.ts             # API route handler
│   └── components/
│       └── contact/
│           └── form/
│               └── index.tsx        # Updated form component
```

## 🔐 Environment Variables Setup

Add these variables to your `.env.local` file:

```env
# Public Sanity Configuration (already configured)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-02

# Server-side Write Token (NEW - REQUIRED)
SANITY_WRITE_TOKEN=your-write-token-here
```

### How to Get SANITY_WRITE_TOKEN:

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it: "Quote Form Write Token"
6. Set permissions: **Editor** (read/write access)
7. Copy the token and add it to `.env.local`

⚠️ **IMPORTANT**: 
- Never commit `SANITY_WRITE_TOKEN` to version control
- Add `.env.local` to `.gitignore`
- The token is only used server-side in API routes

## 📋 Sanity Schema

The `quoteRequest` schema includes:

- **fullName** (string, required): Customer's full name
- **email** (string, required): Valid email address
- **phone** (string, optional): Phone number
- **service** (string, required): Selected service (dropdown)
- **projectDetails** (text, required): Project description
- **language** (string, required): "en" or "de"
- **createdAt** (datetime, auto): Submission timestamp

### Service Options:
- Plaster Casts
- Drywall
- Painting
- Facades and Insulation
- Customer Masons
- Architecture
- Planning
- Interior
- Renovation
- Other

## 🔒 Security Features

1. **Server-Side Only**: Write token is never exposed to the client
2. **API Route Protection**: All writes happen through `/api/quote` route
3. **Input Validation**: Server-side validation before writing to Sanity
4. **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 How It Works

1. User fills out the form on the Contact page
2. Form submits to `/api/quote` (POST request)
3. API route validates the data
4. API route uses `writeClient` to create document in Sanity
5. Success/error response sent back to client
6. Form shows success message or error

## 📝 Usage

The form automatically:
- Detects current language (en/de) using `useLocale()`
- Maps service selections to correct slugs
- Validates all required fields
- Shows loading state during submission
- Displays success/error messages

## 🎨 Sanity Studio

After deploying the schema:

1. Open Sanity Studio
2. You'll see "Quote Request" in the document list
3. View submissions ordered by newest first
4. Each entry shows:
   - Name
   - Service
   - Email
   - Language
   - Date

## 📧 Future: Email Notifications (Optional)

To add email notifications when a quote is submitted:

1. Install an email service (e.g., Resend, SendGrid, Nodemailer)
2. In `/api/quote/route.ts`, after successful Sanity write:
   ```typescript
   // After writeClient.create(document)
   await sendEmail({
     to: 'info@poskamanolito.ch',
     subject: `New Quote Request from ${body.fullName}`,
     body: `...`
   });
   ```

## ✅ Testing

1. Start your development server: `npm run dev`
2. Navigate to `/contact` or `/en/contact` or `/de/contact`
3. Fill out the form
4. Submit and check:
   - Success message appears
   - Data appears in Sanity Studio
   - Language is correctly stored

## 🐛 Troubleshooting

### "SANITY_WRITE_TOKEN is not configured"
- Check `.env.local` has the token
- Restart your dev server after adding env variables
- Verify token has Editor permissions in Sanity

### "Validation failed"
- Check all required fields are filled
- Ensure email is valid format
- Service must match one of the allowed options

### Form not submitting
- Check browser console for errors
- Verify API route is accessible at `/api/quote`
- Check network tab for request/response

## 🔄 Production Deployment

1. Add `SANITY_WRITE_TOKEN` to your hosting platform's environment variables:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **Other**: Follow platform-specific instructions

2. Redeploy your application

3. Test the form in production

## 📚 Related Files

- Schema: `src/sanity/schemaTypes/quoteRequest.ts`
- Write Client: `src/sanity/lib/writeClient.ts`
- API Route: `src/app/api/quote/route.ts`
- Form Component: `src/app/components/contact/form/index.tsx`
- Schema Index: `src/sanity/schemaTypes/index.ts`

---

**Note**: This implementation is production-ready and follows Next.js and Sanity best practices for security and data handling.
