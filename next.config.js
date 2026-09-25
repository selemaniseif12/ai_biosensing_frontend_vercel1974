/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
    turbo: false, // Disable Turbopack to fix PostCSS/Tailwind build crash
  },
};

module.exports = nextConfig;
