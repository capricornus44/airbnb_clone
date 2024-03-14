import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

import CategoryShowcase from '@/components/category-showcase'
import DateRangeCalendar from '@/components/date-range-calendar'
import HomeMap from '@/components/home-map'
import { MakeReservationButton } from '@/components/submit-buttons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createReservation } from '@/lib/actions'
import prisma from '@/lib/db'
import { useCountries } from '@/lib/get-countries'

import defaultUser from '../../../public/default_user.png'

const getData = async ({ homeId }: { homeId: string }) => {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId
    },
    select: {
      id: true,
      title: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      country: true,
      photo: true,
      price: true,
      categoryName: true,
      createdAt: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true
        }
      },
      Reservation: {
        where: {
          homeId
        }
      }
    }
  })

  return data
}

export default async function Home({ params }: { params: { id: string } }) {
  const data = await getData({ homeId: params.id })
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(data?.country as string)
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <section className='container mx-auto mb-36 mt-10 w-full'>
      <h1 className='mb-5 text-3xl font-semibold tracking-tight'>
        {data?.title}
      </h1>

      <div className='relative h-[550px]'>
        <Image
          src={`https://iqoensedfzodmsvskeud.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt='home photo'
          fill
          className='h-full w-full rounded-lg object-cover'
        />
      </div>

      <div className='mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:gap-24'>
        <div className='w-full lg:w-2/3'>
          <h2 className='text-xl font-semibold'>
            {country?.label}, {country?.region}
          </h2>

          <div className='flex items-center gap-x-1 text-muted-foreground'>
            <p>{data?.guests} guests</p>🔹<p>{data?.bedrooms} bedrooms</p>🔹
            <p>{data?.bathrooms} bathrooms</p>
          </div>

          <div className='mt-6 flex items-center gap-x-6'>
            <Image
              src={data?.User?.profileImage ?? defaultUser}
              alt='user photo'
              width={40}
              height={40}
              className='rounded-full'
            />

            <div>
              <p className='text-base font-semibold'>
                Hosted by {data?.User?.firstName} {data?.User?.lastName}
              </p>
              <p className='text-sm text-muted-foreground'>
                Hosting since {new Date(data?.createdAt as Date).getFullYear()}
              </p>
            </div>
          </div>

          <Separator className='my-6' />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className='my-6' />

          <p className='mt-6'>{data?.description}</p>
        </div>

        <form action={createReservation} className='mx-auto w-[332px]'>
          <input type='hidden' name='userId' value={user?.id} />
          <input type='hidden' name='homeId' value={params.id} />

          <DateRangeCalendar reservation={data?.Reservation} />

          {user?.id ? (
            <MakeReservationButton />
          ) : (
            <Button asChild className='w-full'>
              <Link href='/api/auth/login'>Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>

      <Separator className='mb-10 mt-6' />

      <div>
        <h2 className='mb-6 text-2xl font-semibold tracking-tight'>
          Where you'll be
        </h2>

        <HomeMap location={country?.value as string} />
      </div>
    </section>
  )
}
