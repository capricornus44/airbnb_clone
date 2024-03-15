import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import NoResult from '@/components/no-result'
import PlaceCard from '@/components/place-card'
import prisma from '@/lib/db'

const getData = async ({ userId }: { userId: string | undefined }) => {
  noStore()

  const data = await prisma.home.findMany({
    where: {
      userId,
      isCategoryAdded: true,
      isDescriptionAdded: true,
      isLocationAdded: true
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return data
}
export default async function Listings() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) return redirect('/')

  const wishlist = await getData({ userId: user?.id })

  return (
    <section className='container mx-auto mt-10 px-5 lg:px-10'>
      <h1 className='mb-8 text-3xl font-semibold tracking-tight'>Your Homes</h1>

      {wishlist.length === 0 ? (
        <NoResult
          title='No properties added...yet'
          description='Please add your property on Airbnb to see it right here!'
        />
      ) : (
        <ul className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {wishlist.map(place => (
            <PlaceCard
              key={place.id}
              location={place.country as string}
              imagePath={place.photo as string}
              price={place.price as string}
              description={place.description as string}
              userId={user?.id}
              homeId={place.id as string}
              pathname='/listings'
              favoriteId={place.Favorite[0]?.id}
              isFavorite={place.Favorite.length > 0 ? true : false}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
