'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { CATEGORIES } from '@/lib/categories'
import { cn } from '@/lib/utils'

import { Card, CardHeader } from './ui/card'

const SelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  )

  return (
    <ul className='mx-auto mb-36 mt-10 grid max-w-[640px] grid-cols-3 gap-4'>
      <input
        type='hidden'
        name='categoryName'
        value={selectedCategory as string}
      />

      {CATEGORIES.map(({ id, imageUrl, label, name }) => (
        <li key={id} className='cursor-pointer'>
          <Link href=''>
            <Card
              onClick={() => setSelectedCategory(name)}
              className={cn(
                'hover:ring-2 hover:ring-primary',
                selectedCategory === name && 'bg-gray-100 ring-2 ring-primary'
              )}
            >
              <CardHeader>
                <Image src={imageUrl} alt={label} width={32} height={32} />

                <p className='font-semibold'>{label}</p>
              </CardHeader>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SelectedCategory
