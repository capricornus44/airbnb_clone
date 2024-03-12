'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'

const Counter = ({ name }: { name: string }) => {
  const [amount, setAmount] = useState(0)

  const onIncreaseAmount = () => {
    setAmount(prev => prev + 1)
  }

  const onDecreaseAmount = () => {
    if (amount === 0) return

    setAmount(prev => prev - 1)
  }

  return (
    <div className='flex items-center gap-x-4'>
      <input type='hidden' name={name} value={amount} />

      <Button
        variant='outline'
        size='icon'
        type='button'
        onClick={onDecreaseAmount}
      >
        <Minus className='size-4 text-primary' />
      </Button>

      <span className='text-lg font-medium'>{amount}</span>

      <Button
        variant='outline'
        size='icon'
        type='button'
        onClick={onIncreaseAmount}
      >
        <Plus className='size-4 text-primary' />
      </Button>
    </div>
  )
}

export default Counter
