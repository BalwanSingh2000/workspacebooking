/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME || 'auth',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // experimental: {
  //   nodeMiddleware: true, // ✅ Enable Node.js runtime for middleware
  // },
}

module.exports = nextConfig
