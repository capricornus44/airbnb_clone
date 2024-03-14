'use client'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

import { useState } from 'react'
import { DateRange } from 'react-date-range'

const DateRangeCalendar = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  return (
    <DateRange
      date={new Date()}
      minDate={new Date()}
      direction='vertical'
      showDateDisplay={false}
      rangeColors={['#ff5a5f']}
      ranges={state}
      onChange={item => setState([item.selection as any])}
      className='mx-auto w-[332px]'
    />
  )
}

export default DateRangeCalendar
