'use server'

import { redirect } from 'next/navigation'

import prisma from './db'

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId
      }
    })

    return redirect(`/become-a-host/${data.id}/structure`)
  }

  if (
    !data.isCategoryAdded &&
    !data.isDescriptionAdded &&
    !data.isLocationAdded
  ) {
    return redirect(`/become-a-host/${data.id}/structure`)
  }

  if (data.isCategoryAdded && !data.isDescriptionAdded) {
    return redirect(`/become-a-host/${data.id}/description`)
  }
}

export async function addCategoryToAirbnbHome(formData: FormData) {
  const categoryName = formData.get('categoryName') as string
  const homeId = formData.get('homeId') as string

  await prisma.home.update({
    where: {
      id: homeId
    },
    data: {
      categoryName: categoryName,
      isCategoryAdded: true
    }
  })

  return redirect(`/become-a-host/${homeId}/description`)
}
