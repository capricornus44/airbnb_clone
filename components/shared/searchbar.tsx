'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

import { useCountries } from '@/lib/get-countries'

import HomeMap from '../home-map'
import { StructurePageSubmit } from '../submit-buttons'
import { Button } from '../ui/button'
import { Card, CardHeader } from '../ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'

import Counter from './counter'

const Searchbar = () => {
  const [step, setStep] = useState(1)
  const { getAllCountries } = useCountries()
  const [location, setLocation] = useState('')

  const FormSubmitButton = () => {
    if (step === 1) {
      return (
        <Button type='button' onClick={() => setStep(prev => prev + 1)}>
          Next
        </Button>
      )
    }

    if (step === 2) {
      return <StructurePageSubmit />
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative flex cursor-pointer items-center rounded-full border px-4 py-2'>
          <div className='flex h-full divide-x text-sm font-semibold'>
            <p className='px-4'>Anywhere</p>
            <p className='px-4'>Any week</p>
            <p className='px-4'>Add guests</p>
          </div>

          <Button
            variant='outline'
            size='icon'
            className='relative -right-2 size-8 rounded-full border-0 bg-primary text-white'
          >
            <Search className='size-4' />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form className='flex flex-col gap-4'>
          <input type='hidden' name='country' value={location} />

          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
              </DialogHeader>

              <Select
                required
                value={location}
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

              <HomeMap location={location} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all info that you need</DialogTitle>
              </DialogHeader>

              <Card>
                <CardHeader className='flex flex-col gap-y-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h2 className='font-medium underline'>Guests</h2>
                      <p className='text-sm text-muted-foreground'>
                        How many guests do you want?
                      </p>
                    </div>

                    <Counter name='guests' />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h2 className='font-medium underline'>Rooms</h2>
                      <p className='text-sm text-muted-foreground'>
                        How many rooms do you have?
                      </p>
                    </div>

                    <Counter name='rooms' />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                      <h2 className='font-medium underline'>Bathrooms</h2>
                      <p className='text-sm text-muted-foreground'>
                        How many bathrooms do you have?
                      </p>
                    </div>

                    <Counter name='bathrooms' />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <FormSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Searchbar
