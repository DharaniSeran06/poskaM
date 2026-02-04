import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

// Build providers array conditionally - only add providers with valid credentials
const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      // Add your own authentication logic here
      if (credentials?.username === 'admin' && credentials?.password === 'admin123') {
        // Return user object if credentials are valid
        return Promise.resolve({ id: 1, name: 'Admin', email: 'admin@example.com' });
      } else {
        // Return null if credentials are invalid
        return Promise.resolve(null);
      }
    },
  }),
];

// Only add OAuth providers if credentials are provided and not empty
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID.trim() !== '' && 
    process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_SECRET.trim() !== '') {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_ID.trim() !== '' && 
    process.env.GITHUB_SECRET && process.env.GITHUB_SECRET.trim() !== '') {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

// Get NEXTAUTH_URL safely - ensure it's never empty
const getNextAuthUrl = () => {
  const url = process.env.NEXTAUTH_URL;
  if (url && url.trim() !== '') {
    return url;
  }
  // Fallback for development
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

// Ensure NEXTAUTH_URL is set for development
if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV !== 'production') {
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
}

const handler = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production',
  debug: process.env.NODE_ENV === 'development',
  // Ensure next-auth uses the correct base URL
  useSecureCookies: process.env.NODE_ENV === 'production',
  // Set the base URL to prevent "Invalid URL" errors
  url: getNextAuthUrl(),
});

export { handler as GET, handler as POST };
