import BottomBar from '@/components/host-bottom-bar'
import SelectedCategory from '@/components/selected-category'
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

        <BottomBar />
      </form>
    </>
  )
}

export default StructurePage
