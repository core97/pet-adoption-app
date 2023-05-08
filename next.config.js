/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@next-auth/prisma-adapter', '@prisma/client']
  },
};

module.exports = nextConfig;
