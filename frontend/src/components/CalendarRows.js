import React from 'react'
import { CalendarRow } from './CalendarRow'


export const CalendarRows = (props) => {
  return(
    <div className='cal-days'>
      { props.dayNumbers.map((days, key) => {
        return <CalendarRow { ...props } days= { days } key={ key }/>
      })}
    </div>
  );
}
