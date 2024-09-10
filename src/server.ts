import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log:  ['query'],
  });

console.log("Server aula prisma")