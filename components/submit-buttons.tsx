'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button } from './ui/button'

export const StructurePageSubmit = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size='lg' className='text-base'>
          <Loader2 className='mr-2 size-4 animate-spin' /> Please wait
        </Button>
      ) : (
        <Button type='submit' size='lg' className='text-base'>
          Next
        </Button>
      )}
    </>
  )
}
