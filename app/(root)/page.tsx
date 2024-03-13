import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Suspense } from 'react'

import CategoriesFilter from '@/components/categories-filter'
import NoResult from '@/components/no-result'
import PlaceCard from '@/components/place-card'
import SkeletonCard from '@/components/skeleton-card'
import prisma from '@/lib/db'

const getData = async ({
  searchParams,
  userId
}: {
  userId: string | undefined
  searchParams?: { filter?: string }
}) => {
  const data = await prisma.home.findMany({
    where: {
      isCategoryAdded: true,
      isDescriptionAdded: true,
      isLocationAdded: true,
      categoryName: searchParams?.filter ?? undefined
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined
        }
      }
    }
  })

  return data
}

export default function Home({
  searchParams
}: {
  searchParams?: { filter?: string }
}) {
  return (
    <main className='container mx-auto px-5 lg:px-10'>
      <CategoriesFilter />

      <Suspense key={searchParams?.filter} fallback={<LoadingSkeleton />}>
        <PlacesList searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

const PlacesList = async ({
  searchParams
}: {
  searchParams?: { filter?: string }
}) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const places = await getData({ searchParams, userId: user?.id })

  return (
    <>
      {places.length === 0 ? (
        <NoResult />
      ) : (
        <ul className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {places.map(place => (
            <PlaceCard
              key={place.id}
              location={place.country as string}
              imagePath={place.photo as string}
              price={place.price as string}
              description={place.description as string}
              userId={user?.id}
              isFavorite={place.Favorite.length > 0 ? true : false}
              favoriteId={place.Favorite[0]?.id}
              homeId={place.id}
              pathname='/'
            />
          ))}
        </ul>
      )}
    </>
  )
}

const LoadingSkeleton = () => {
  return (
    <div className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
