import Link from 'next/link'

import SelectedCategory from '@/components/selected-category'
import { StructurePageSubmit } from '@/components/submit-buttons'
import { addCategoryToAirbnbHome } from '@/lib/actions'

const StructurePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <h1 className='text-center text-3xl font-semibold tracking-tight transition-colors'>
        Which of these best describes your place?
      </h1>

      <form action={addCategoryToAirbnbHome}>
        <input type='hidden' name='homeId' value={params.id} />
        <SelectedCategory />

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
      </form>
    </>
  )
}

export default StructurePage
