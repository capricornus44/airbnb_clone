import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import NoResult from '@/components/no-result'
import PlaceCard from '@/components/place-card'
import prisma from '@/lib/db'

interface HomeFavorite {
  id: string
}

interface Home {
  photo?: string
  id?: string
  price?: string
  description?: string
  country?: string
  Favorite: HomeFavorite[]
}

interface WishlistItem {
  Home?: Home
}

const getData = async ({ userId }: { userId: string | undefined }) => {
  noStore()

  const data = await prisma.favorite.findMany({
    where: {
      userId
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          price: true,
          description: true,
          country: true,
          Favorite: true
        }
      }
    }
  })

  return data
}

export default async function Wishlists() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) return redirect('/')

  const wishlist: WishlistItem[] = await getData({ userId: user?.id })

  return (
    <section className='container mx-auto mt-10 px-5 lg:px-10'>
      <h1 className='mb-8 text-3xl font-semibold tracking-tight'>Wishlists</h1>

      {wishlist.length === 0 ? (
        <NoResult
          title="You don't have any wishes."
          description='Please add wishes to see them right here!'
        />
      ) : (
        <ul className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {wishlist.map((place: WishlistItem) => (
            <PlaceCard
              key={place.Home?.id}
              location={place.Home?.country as string}
              imagePath={place.Home?.photo as string}
              price={place.Home?.price as string}
              description={place.Home?.description as string}
              userId={user?.id}
              homeId={place.Home?.id as string}
              pathname='/wishlists'
              favoriteId={place.Home?.Favorite[0]?.id as string}
              isFavorite={
                (place.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </ul>
      )}
    </section>
  )
}
