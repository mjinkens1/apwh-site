import React from 'react'
import Calendar from './Calendar'

export const InitialView = (props) => {
  props.setViewName(props.name)
  return (
    <div className='bg-img'>
      <div className='heading-wrapper'>
        <p className="heading">Ms. Jinkens</p>
        <p>AP World History</p>
      </div>
      <div className='initial-content'>
        <Calendar
         selectedDay={ props.selectedDay }
         selectDay={ props.selectDay }
         calendarDays={ props.calendarDays }
         getCalendarDays={ props.getCalendarDays }/>
      </div>
    </div>
  );
}
