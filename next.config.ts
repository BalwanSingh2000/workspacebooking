/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME || 'auth',
  },
  eslint: {
    // ✅ Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
