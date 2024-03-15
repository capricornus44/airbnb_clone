import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
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

interface Reservation {
  id: string
  startDate: Date
  endDate: Date
  Home?: Home
}

const getData = async ({ userId }: { userId: string }) => {
  const data: Reservation[] = await prisma.reservation.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      Home: {
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
        }
      }
    }
  })

  return data
}

export default async function Trips() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id) return redirect('/')

  const data = await getData({ userId: user.id })

  return (
    <section className='container mx-auto mt-10 px-5 lg:px-10'>
      <h1 className='mb-8 text-3xl font-semibold tracking-tight'>Trips</h1>

      {data.length === 0 ? (
        <NoResult
          title='No trips booked...yet!'
          description='Time to dust off your bags and start planning your next adventure'
        />
      ) : (
        <ul className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((reservation: Reservation) => (
            <PlaceCard
              key={reservation.id}
              location={reservation.Home?.country as string}
              imagePath={reservation.Home?.photo as string}
              price={reservation.Home?.price as string}
              description={reservation.Home?.description as string}
              userId={user.id}
              homeId={reservation.Home?.id as string}
              pathname='/trips'
              favoriteId={reservation.Home?.Favorite[0]?.id as string}
              isFavorite={
                (reservation.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </ul>
      )}
    </section>
  )
}
