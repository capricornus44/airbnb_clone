import Image from 'next/image'
import Link from 'next/link'

import { addToFavorite, deleteFromFavorite } from '@/lib/actions'
import { useCountries } from '@/lib/get-countries'

import { AddToFavoriteButton, DeleteFromFavoriteButton } from './submit-buttons'

interface iPlaceCard {
  imagePath: string
  price: string
  description: string
  location: string
  userId?: string
  isFavorite: boolean
  favoriteId: string
  homeId: string
  pathname: string
}

const PlaceCard = ({
  imagePath,
  price,
  description,
  location,
  userId,
  isFavorite,
  favoriteId,
  homeId,
  pathname
}: iPlaceCard) => {
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(location)

  return (
    <div>
      <div className='relative mb-3 h-72'>
        <Image
          src={`https://iqoensedfzodmsvskeud.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt='place photo'
          fill
          className='h-full rounded-lg object-cover'
        />

        {userId && (
          <div className='absolute right-2 top-2 z-10'>
            {isFavorite ? (
              <form action={deleteFromFavorite}>
                <input type='hidden' name='favoriteId' value={favoriteId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathname' value={pathname} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type='hidden' name='homeId' value={homeId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathname' value={pathname} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href=''>
        <h2 className='font-semibold'>
          {country?.label}, {country?.region}
        </h2>
        <p className='mb-2 line-clamp-2 text-sm text-muted-foreground'>
          {description}
        </p>
        <p className='text-sm'>
          <span className='mr-1 font-semibold'>${price}</span> night
        </p>
      </Link>
    </div>
  )
}

export default PlaceCard
