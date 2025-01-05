const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const nextConfig = withPWA({
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactStrictMode: false,
});

module.exports = nextConfig;
