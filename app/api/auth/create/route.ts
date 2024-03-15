import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'

import prisma from '@/lib/db'

export async function GET() {
  noStore()
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user === null || !user.id) {
    throw new Error('User not found')
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? '',
        firstName: user.given_name ?? '',
        lastName: user.family_name ?? '',
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
      }
    })
  }

  return NextResponse.redirect('http://localhost:3000/')
}
