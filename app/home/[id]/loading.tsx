import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <section className='container mx-auto mb-36 mt-10 w-full'>
      <Skeleton className='mb-5 h-9 w-1/3' />
      <Skeleton className='h-[550px] w-full rounded-lg' />

      <div className='mb-10 mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:gap-24'>
        <div className='w-full lg:w-2/3'>
          <Skeleton className='mb-1 h-7 w-1/3' />
          <Skeleton className='h-6 w-1/3' />

          <div className='mt-6 flex items-center gap-x-6'>
            <Skeleton className='size-10 rounded-full' />
            <div>
              <Skeleton className='mb-2 h-6 w-1/3' />
              <Skeleton className='h-5 w-1/2' />
            </div>
          </div>

          <div className='mt-6 flex items-center gap-x-6'>
            <Skeleton className='size-10 rounded-full' />
            <div>
              <Skeleton className='mb-2 h-6 w-1/4' />
              <Skeleton className='h-5 w-1/2' />
            </div>
          </div>

          <Skeleton className='mt-6 h-36 w-full' />
        </div>

        <div className='mx-auto w-[332px]'>
          <Skeleton className='mb-2 h-80 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      <Skeleton className='mb-6 h-8 w-1/3' />
      <Skeleton className='h-[50vh] w-full' />
    </section>
  )
}

export default Loading
