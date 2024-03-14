import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <section className='container mx-auto mb-36 mt-10 w-full'>
      <Skeleton className='mb-5 h-9 w-1/3' />
      <Skeleton className='h-[550px] w-full rounded-lg' />

      <div className='mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:gap-24'>
        <div className='w-full lg:w-2/3'>
          <Skeleton className='mb-1 h-7 w-1/3' />
          <Skeleton className='h-6 w-1/3' />
        </div>

        <Skeleton className='size-80' />
      </div>
    </section>
  )
}

export default Loading
