import Image from 'next/image'

import { CATEGORIES } from '@/lib/categories'

const CategoryShowcase = ({ categoryName }: { categoryName: string }) => {
  const category = CATEGORIES.find(category => category.name === categoryName)

  return (
    <div className='flex items-center gap-x-6'>
      <Image
        src={category?.imageUrl as string}
        alt='category icon'
        width={40}
        height={40}
      />

      <div>
        <h3 className='text-base font-semibold'>{category?.label}</h3>
        <p className='text-sm text-muted-foreground'>{category?.description}</p>
      </div>
    </div>
  )
}

export default CategoryShowcase
