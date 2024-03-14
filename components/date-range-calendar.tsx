'use client'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

import { eachDayOfInterval } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-date-range'

const DateRangeCalendar = ({
  reservation
}: {
  reservation?: {
    startDate: Date
    endDate: Date
  }[]
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  let disabledDates: Date[] = []

  reservation?.forEach(reservationDate => {
    const bookedDate = eachDayOfInterval({
      start: new Date(reservationDate.startDate),
      end: new Date(reservationDate.endDate)
    })

    disabledDates = [...disabledDates, ...bookedDate]
  })

  return (
    <>
      <input
        type='hidden'
        name='startDate'
        value={state[0].startDate.toISOString()}
      />
      <input
        type='hidden'
        name='endDate'
        value={state[0].endDate.toISOString()}
      />

      <DateRange
        date={new Date()}
        minDate={new Date()}
        direction='vertical'
        showDateDisplay={false}
        rangeColors={['#ff5a5f']}
        disabledDates={disabledDates}
        ranges={state}
        onChange={item => setState([item.selection as any])}
      />
    </>
  )
}

export default DateRangeCalendar
