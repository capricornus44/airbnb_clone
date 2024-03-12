import BottomBar from '@/components/host-bottom-bar'
import Counter from '@/components/shared/counter'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addDescriptionToAirbnbHome } from '@/lib/actions'

const DescriptionPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className='mx-auto max-w-[640px]'>
        <h1 className='text-3xl font-semibold tracking-tight transition-colors'>
          Please describe your home as you can!
        </h1>
      </div>

      <form action={addDescriptionToAirbnbHome}>
        <input type='hidden' name='homeId' value={params.id} />

        <div className='mx-auto mb-36 mt-10 flex max-w-[640px] flex-col gap-y-5'>
          <div className='flex flex-col gap-y-2'>
            <Label>Title</Label>
            <Input name='title' placeholder='Short and simple...' required />
          </div>

          <div className='flex flex-col gap-y-2'>
            <Label>Description</Label>
            <Textarea
              name='description'
              placeholder='Please describe your home...'
              required
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <Label>Price</Label>
            <Input
              name='price'
              type='number'
              placeholder='Price per night in USD'
              required
              min={10}
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <Label>Image</Label>
            <Input name='image' type='file' required />
          </div>

          <Card>
            <CardHeader className='flex flex-col gap-y-5'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <h2 className='font-medium underline'>Guests</h2>
                  <p className='text-sm text-muted-foreground'>
                    How many guests do you want?
                  </p>
                </div>

                <Counter name='guests' />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <h2 className='font-medium underline'>Rooms</h2>
                  <p className='text-sm text-muted-foreground'>
                    How many rooms do you have?
                  </p>
                </div>

                <Counter name='rooms' />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <h2 className='font-medium underline'>Bathrooms</h2>
                  <p className='text-sm text-muted-foreground'>
                    How many bathrooms do you have?
                  </p>
                </div>

                <Counter name='bathrooms' />
              </div>
            </CardHeader>
          </Card>
        </div>

        <BottomBar />
      </form>
    </>
  )
}

export default DescriptionPage
