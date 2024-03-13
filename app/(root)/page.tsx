import CategoriesFilter from '@/components/categories-filter'
import PlaceCard from '@/components/place-card'
import prisma from '@/lib/db'

const getData = async ({
  searchParams
}: {
  searchParams?: { filter?: string }
}) => {
  const data = await prisma.home.findMany({
    where: {
      isCategoryAdded: true,
      isDescriptionAdded: true,
      isLocationAdded: true,
      categoryName: searchParams?.filter ?? undefined
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true
    }
  })

  return data
}

export default async function Home({
  searchParams
}: {
  searchParams?: { filter?: string }
}) {
  const places = await getData({ searchParams })

  return (
    <main className='container mx-auto px-5 lg:px-10'>
      <CategoriesFilter />

      <ul className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {places.map(place => (
          <PlaceCard
            key={place.id}
            location={place.country as string}
            imagePath={place.photo as string}
            price={place.price as string}
            description={place.description as string}
            id={place.id as string}
          />
        ))}
      </ul>
    </main>
  )
}
