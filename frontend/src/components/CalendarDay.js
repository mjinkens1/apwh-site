import React from 'react'
import { CalendarIcons } from './CalendarIcons'


export const CalendarDay = (props) => {

  var isToday = props.day.today ? ' today' : ''
  var isSelectedDay = (props.day.dayNumber === props.selectedDay.dayNumber
    && props.day.month === props.selectedDay.month && props.day.year ===
    props.selectedDay.year) ? ' selected-day' : ''
  var isSelectedMonth = props.day.selectedMonth ? '' : ' not-selected-month'

  return(
    <div className={ 'cal-day' + isSelectedDay + isSelectedMonth } onClick={ () => {
      props.selectDay({
        dayNumber: props.day.dayNumber,
        monthIndex: props.day.monthIndex,
        month: props.day.month,
        year: props.day.year
      });
    }}>
      <div className={ 'day-number' + isToday}>
        { props.day.dayNumber }
      </div>
      <CalendarIcons>
        { props.calendarIcons }
      </CalendarIcons>
    </div>
  );
}
