import React from 'react'
import { CalendarDay } from './CalendarDay'


export const CalendarRow = (props) => {

  return(
    <React.Fragment>
      { props.days.map((day, key) => {
        return <CalendarDay { ...props } day={ day } key={ key }/>;
      })}
    </React.Fragment>
  );
}
