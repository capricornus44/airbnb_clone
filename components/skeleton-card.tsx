import { Skeleton } from '@/components/ui/skeleton'

const SkeletonCard = () => {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-72 w-full rounded-lg' />

      <div className='mb-2 space-y-1'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-full' />
      </div>

      <Skeleton className='h-4 w-1/3' />
    </div>
  )
}

export default SkeletonCard
