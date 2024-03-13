import { File } from 'lucide-react'

const NoResult = () => {
  return (
    <div className='mt-10 flex min-h-[100px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <div className='mb-4 flex flex-col items-center justify-center rounded-full bg-primary/10 p-4 text-primary'>
        <File className='size-12' />
      </div>

      <p className='text-lg font-semibold'>
        No result.
        <br />
        <span className='text-muted-foreground'>
          Please select another category or create your own host!
        </span>
      </p>
    </div>
  )
}

export default NoResult
