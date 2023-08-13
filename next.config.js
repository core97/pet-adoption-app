/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      '@next-auth/prisma-adapter',
      '@prisma/client',
      'cloudinary',
      'pino',
      'pino-pretty',
    ],
  },
};

module.exports = nextConfig;
