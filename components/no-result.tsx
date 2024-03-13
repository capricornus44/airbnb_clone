import { FileQuestion } from 'lucide-react'

interface iNoResultProps {
  title: string
  description: string
}

const NoResult = ({ title, description }: iNoResultProps) => {
  return (
    <div className='mt-10 flex min-h-[100px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <div className='mb-4 flex flex-col items-center justify-center rounded-full bg-primary/10 p-4 text-primary'>
        <FileQuestion className='size-12' />
      </div>

      <p className='text-lg font-semibold'>
        {title}
        <br />
        <span className='text-base text-muted-foreground'>{description}</span>
      </p>
    </div>
  )
}

export default NoResult
