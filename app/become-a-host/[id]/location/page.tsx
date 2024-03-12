'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import BottomBar from '@/components/host-bottom-bar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { addLocationToAirbnbHome } from '@/lib/actions'
import { useCountries } from '@/lib/get-countries'

const LocationPage = ({ params }: { params: { id: string } }) => {
  const { getAllCountries } = useCountries()
  const [location, setLocation] = useState('')

  const LazyMap = dynamic(() => import('@/components/map'), {
    ssr: false,
    loading: () => <Skeleton className='relative z-0 h-[50vh] rounded-lg' />
  })

  return (
    <>
      <div className='mx-auto max-w-[640px]'>
        <h1 className='mb-10 text-3xl font-semibold tracking-tight transition-colors'>
          Where is your Home located?
        </h1>
      </div>

      <form action={addLocationToAirbnbHome}>
        <input type='hidden' name='homeId' value={params.id} />
        <input type='hidden' name='country' value={location} />

        <div className='mx-auto mb-36 max-w-[640px]'>
          <div className='mb-5'>
            <Select
              required
              onValueChange={(value: string) => setLocation(value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a country' />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map(({ value, label, flag, region }) => (
                    <SelectItem key={value} value={value}>
                      {flag} {label} - {region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap location={location} />
        </div>

        <BottomBar />
      </form>
    </>
  )
}

export default LocationPage
