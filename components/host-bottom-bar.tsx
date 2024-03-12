import Link from 'next/link'

import { StructurePageSubmit } from './submit-buttons'

const BottomBar = () => {
  return (
    <div className='fixed bottom-0 z-10 h-20 w-full border-t bg-white'>
      <div className='flex h-full w-full items-center justify-between px-5 lg:px-10'>
        <Link
          href='/'
          className='border-b border-black text-base font-semibold text-black'
        >
          Cancel
        </Link>

        <StructurePageSubmit />
      </div>
    </div>
  )
}

export default BottomBar
