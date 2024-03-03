import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | undefined

const prismaClientSingleton = () => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export default prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  const globalObject = globalThis as unknown as {
    prisma: PrismaClient | undefined
  }
  globalObject.prisma = prisma
}
