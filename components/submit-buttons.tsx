'use client'

import { Heart, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button } from './ui/button'

export const StructurePageSubmit = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size='lg' className='text-base'>
          <Loader2 className='mr-2 size-4 animate-spin' /> Please wait...
        </Button>
      ) : (
        <Button type='submit' size='lg' className='text-base'>
          Next
        </Button>
      )}
    </>
  )
}

export const AddToFavoriteButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          disabled
          className='bg-primary-foreground'
        >
          <Loader2 className='animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          type='submit'
          className='bg-primary-foreground'
        >
          <Heart />
        </Button>
      )}
    </>
  )
}

export const DeleteFromFavoriteButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          disabled
          className='bg-primary-foreground'
        >
          <Loader2 className='animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          type='submit'
          className='bg-primary-foreground'
        >
          <Heart fill='#e21c49' className='text-primary' />
        </Button>
      )}
    </>
  )
}

export const MakeReservationButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled className='w-full text-base'>
          <Loader2 className='mr-2 size-4 animate-spin' /> Please wait...
        </Button>
      ) : (
        <Button type='submit' className='w-full text-base'>
          Make a reservation
        </Button>
      )}
    </>
  )
}
