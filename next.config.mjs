import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use custom loader to leverage Sanity's CDN optimization
    // This prevents Next.js timeout issues with large images
    loader: 'custom',
    loaderFile: './src/lib/sanity-image-loader.ts',
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    // Cache settings - longer cache for better performance
    minimumCacheTTL: 31536000, // 1 year
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Image formats - let Next.js handle format conversion
    formats: ['image/avif', 'image/webp'],
    // Security settings
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Increase timeout for API routes (affects image optimization)
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Ensure proper module resolution and handle next-intl warnings
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Suppress webpack warnings about next-intl dynamic imports
    // This is a known issue with webpack's static analysis of dynamic imports in next-intl
    // The warning is harmless but can clutter the build output
    const originalIgnoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings = [
      ...originalIgnoreWarnings,
      {
        module: /node_modules\/next-intl/,
        message: /Parsing of .* for build dependencies failed/,
      },
      {
        module: /node_modules\/next-intl/,
        message: /Build dependencies behind this expression are ignored/,
      },
      // Also ignore FileSystemInfo warnings from next-intl
      {
        module: /node_modules\/next-intl/,
        message: /FileSystemInfo/,
      },
    ];

    return config;
  },
};

export default withNextIntl(nextConfig);
