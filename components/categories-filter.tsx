'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { CATEGORIES } from '@/lib/categories'
import { cn } from '@/lib/utils'

const CategoriesFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const filter = searchParams.get('filter')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(name, value)

      return newSearchParams.toString()
    },
    [searchParams]
  )

  return (
    <div className='no-scrollbar my-5 flex w-full gap-x-10 overflow-x-scroll'>
      {CATEGORIES.map(({ id, name, label, imageUrl }) => (
        <Link
          key={id}
          href={`${pathname}?${createQueryString('filter', name)}`}
          className={cn(
            'flex flex-col items-center gap-y-2 border-b-2 border-transparent pb-2',
            filter === name
              ? 'flex-shrink-0 border-black'
              : 'flex-shrink-0 opacity-60 hover:border-gray-200 hover:opacity-100'
          )}
        >
          <div className='relative size-6'>
            <Image src={imageUrl} alt={label} width={24} height={24} />
          </div>
          <p className='text-xs font-semibold'>{label}</p>
        </Link>
      ))}
    </div>
  )
}

export default CategoriesFilter
