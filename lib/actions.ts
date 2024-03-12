'use server'

import { redirect } from 'next/navigation'

import prisma from './db'
import { supabase } from './supabase'

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

export async function addDescriptionToAirbnbHome(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = formData.get('price')
  const imageFile = formData.get('image') as File
  const guests = formData.get('guests') as string
  const rooms = formData.get('rooms') as string
  const bathrooms = formData.get('bathrooms') as string

  const homeId = formData.get('homeId') as string

  const { data: imageData } = await supabase.storage
    .from('images')
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: '2592000', // whole year
      contentType: 'image/png'
    })

  await prisma.home.update({
    where: {
      id: homeId
    },
    data: {
      title,
      description,
      price: price?.toString(),
      photo: imageData?.path,
      guests,
      bedrooms: rooms,
      bathrooms,
      isDescriptionAdded: true
    }
  })

  return redirect(`/become-a-host/${homeId}/location`)
}
