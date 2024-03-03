import { Suspense } from 'react'

import CategoriesFilter from '@/components/categories-filter'

export default function Home() {
  return (
    <main className='container mx-auto px-5 lg:px-10'>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesFilter />
      </Suspense>
    </main>
  )
}
