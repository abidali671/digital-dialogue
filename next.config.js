const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * Security headers for crawl audits and browser hardening.
 * CSP allows Next.js, Contentful images, Formspree, Google Analytics, and Google AdSense.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://formspree.io",
  "img-src 'self' data: blob: https://images.ctfassets.net https://*.ctfassets.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://www.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://www.google.com https://www.gstatic.com https://adservice.google.com https://www.googletagmanager.com",
  "connect-src 'self' https://formspree.io https://cdn.contentful.com https://images.ctfassets.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://www.googletagmanager.com",
  "upgrade-insecure-requests",
].join("; ");

const scriptHosts =
  "https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagservices.com https://www.google.com https://www.gstatic.com https://adservice.google.com https://www.googletagmanager.com https://*.adtrafficquality.google https://fundingchoicesmessages.google.com";

const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://formspree.io",
  "img-src 'self' data: blob: https://images.ctfassets.net https://*.ctfassets.net https://*.googlesyndication.com https://www.google.com https://*.google.com https://www.gstatic.com https://*.google-analytics.com https://www.googletagmanager.com https://*.doubleclick.net https://*.adtrafficquality.google",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' ${scriptHosts}`,
  "connect-src 'self' https://formspree.io https://cdn.contentful.com https://images.ctfassets.net https://*.googlesyndication.com https://www.google.com https://*.doubleclick.net https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.adtrafficquality.google https://fundingchoicesmessages.google.com",
  "frame-src 'self' https://*.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://www.google.com https://www.googletagmanager.com https://*.adtrafficquality.google https://fundingchoicesmessages.google.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
  "report-uri /api/csp-report",
].join("; ");

/** Removed niche categories → freelancing hub (301). */
const REMOVED_CATEGORIES = [
  "content-creation",
  "technology",
  "digital-marketing",
  "web-development",
  "design-and-creativity",
  "design-creativity",
];

/** Unpublished freelancing posts that used to live under /blogs/freelancing. */
const REMOVED_FREELANCING_SLUGS = [
  "how-to-earn-money-online-with-your-smartphone",
  "how-to-earn-money-online-from-home",
  "best-ways-to-earn-money-online-with-instagram",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1200],
    imageSizes: [128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  async redirects() {
    const freelancing = "/blogs/freelancing";
    const categoryRedirects = REMOVED_CATEGORIES.flatMap((slug) => [
      {
        source: `/blogs/${slug}`,
        destination: freelancing,
        permanent: true,
      },
      {
        source: `/blogs/${slug}/:path*`,
        destination: freelancing,
        permanent: true,
      },
    ]);
    const postRedirects = REMOVED_FREELANCING_SLUGS.map((slug) => ({
      source: `/blogs/freelancing/${slug}`,
      destination: freelancing,
      permanent: true,
    }));
    return [...categoryRedirects, ...postRedirects];
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
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
