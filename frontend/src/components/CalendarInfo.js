import React from 'react'
import { CalendarInfoPanel } from './CalendarInfoPanel'

export const CalendarInfo = (props) => {
  return(
    <div className='calendar-info'>
      { props.children }
    </div>
  )
}
