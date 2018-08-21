import React from 'react'


export const CalendarInfoHeader = (props) => {
  console.log(props)
  return(
    <div className='cal-info-header'>
      <p>
        { React.Children.map(props.selectedDay.date, (child, index) => {
            if(index === 3) return;

            if(child.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/))
              return child = props.months[child] + ' ';

            if(child[0].match(/0/))
              return child[1];

            return child + ' ';

        })}
      </p>
    </div>
  );
}
