import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma && typeof window === 'undefined') {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
