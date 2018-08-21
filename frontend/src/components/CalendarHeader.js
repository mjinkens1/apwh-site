import React from 'react'


export const CalendarHeader = (props) => {
  return(
    <div className='cal-header'>

      <i className='fas fa-angle-double-left'
       onClick={ () => props.getCalendarDays(props.calendarDays.monthIndex - 12) }
      />

      <i className='fas fa-angle-left'
       onClick={ () => props.getCalendarDays(props.calendarDays.monthIndex - 1) }
       />

      <p>
        { React.Children.map(props.calendarDays.selected, (child, index) => {
          if(index === 0 || index === 2)
            return;

          if(child.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/))
            return child = props.months[child] + ' '

            return child;

        })}
      </p>

      <i className='fas fa-angle-right'
      onClick={ () => props.getCalendarDays(props.calendarDays.monthIndex + 1) }
      />

      <i className='fas fa-angle-double-right'
       onClick={ () => props.getCalendarDays(props.calendarDays.monthIndex + 12) }
      />

    </div>
  );
}
