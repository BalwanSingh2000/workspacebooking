/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME || 'auth',
  },
}

module.exports = nextConfig
