/** @type {import('next').NextConfig} */
const nextConfig = {
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
