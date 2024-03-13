import SkeletonCard from '@/components/skeleton-card'

const Loading = () => {
  return (
    <section className='container mx-auto mt-10 px-5 lg:px-10'>
      <h1 className='mb-8 text-3xl font-semibold tracking-tight'>Wishlists</h1>

      <div className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  )
}

export default Loading
