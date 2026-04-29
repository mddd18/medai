// next.config.js
// Sog'lomBola AI — Next.js + PWA konfiguratsiyasi
// =====================================================

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    // D-Med API: NetworkFirst (yangi ma'lumotlar muhim)
    {
      urlPattern: /^\/api\/dmed\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'dmed-api-cache',
        expiration: { maxEntries: 32, maxAgeSeconds: 5 * 60 },
        networkTimeoutSeconds: 10,
      },
    },
    // AI API: NetworkFirst, lekin offline'da ham ishlaydi
    {
      urlPattern: /^\/api\/ai\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ai-api-cache',
        expiration: { maxEntries: 16, maxAgeSeconds: 60 },
      },
    },
    // Tasks API: NetworkFirst
    {
      urlPattern: /^\/api\/tasks\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'tasks-cache',
        expiration: { maxEntries: 32, maxAgeSeconds: 60 },
      },
    },
    // Booking API: NetworkFirst
    {
      urlPattern: /^\/api\/booking\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'booking-cache',
        expiration: { maxEntries: 32, maxAgeSeconds: 5 * 60 },
      },
    },
    // Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    // Static assets
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    // JS/CSS
    {
      urlPattern: /\.(js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-resources' },
    },
    // Pages
    {
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 32 },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = withPWA(nextConfig);
