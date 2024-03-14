import dynamic from 'next/dynamic'

import { Skeleton } from './ui/skeleton'

const HomeMap = ({ location }: { location: string }) => {
  const LazyMap = dynamic(() => import('@/components/map'), {
    ssr: false,
    loading: () => <Skeleton className='relative z-0 h-[50vh] rounded-lg' />
  })

  return <LazyMap location={location} />
}

export default HomeMap
