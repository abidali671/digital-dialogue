const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * Security headers for crawl audits and browser hardening.
 * CSP allows Next.js, Contentful images, Formspree, and Google AdSense.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://formspree.io",
  "img-src 'self' data: blob: https://images.ctfassets.net https://*.ctfassets.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://www.gstatic.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://www.google.com https://www.gstatic.com https://adservice.google.com",
  "connect-src 'self' https://formspree.io https://cdn.contentful.com https://images.ctfassets.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://www.googletagmanager.com",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
