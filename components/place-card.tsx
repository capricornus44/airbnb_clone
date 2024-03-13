import Image from 'next/image'
import Link from 'next/link'

import { useCountries } from '@/lib/get-countries'

import { Card, CardContent, CardFooter, CardHeader } from './ui/card'

interface iPlaceCard {
  imagePath: string
  id: string
  price: string
  description: string
  location: string
}

const PlaceCard = ({
  imagePath,
  id,
  price,
  description,
  location
}: iPlaceCard) => {
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(location)

  console.log(id)

  return (
    <Link href='' role='li'>
      <Card className='border-0 shadow-none'>
        <CardHeader className='relative mb-3 h-72'>
          <Image
            src={`https://iqoensedfzodmsvskeud.supabase.co/storage/v1/object/public/images/${imagePath}`}
            alt='place photo'
            fill
            className='h-full rounded-lg object-cover'
          />
        </CardHeader>

        <CardContent className='mb-2 p-0'>
          <h2 className='font-semibold'>
            {country?.label}, {country?.region}
          </h2>
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {description}
          </p>
        </CardContent>

        <CardFooter className='p-0'>
          <p className='text-sm'>
            <span className='mr-1 font-semibold'>${price}</span> night
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default PlaceCard
