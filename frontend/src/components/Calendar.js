import React from 'react'
import { CalendarInfo } from './CalendarInfo'
import { CalendarInfoHeader } from './CalendarInfoHeader'
import { CalendarInfoPanel } from './CalendarInfoPanel'
import { CalendarHeader } from './CalendarHeader'
import { CalendarDayNames } from './CalendarDayNames'
import { CalendarRows } from './CalendarRows'


var days = {
  'Sun':'Sunday',
  'Mon':'Monday',
  'Tue':'Tuesday',
  'Wed':'Wednesday',
  'Thu':'Thursday',
  'Fri':'Friday',
  'Sat':'Saturday',
}

var months = {
  'Jan': 'January',
  'Feb': 'February',
  'Mar': 'March',
  'Apr': 'April',
  'May': 'May',
  'Jun': 'June',
  'Jul': 'July',
  'Aug': 'August',
  'Sep': 'September',
  'Oct': 'October',
  'Nov': 'November',
  'Dec': 'December'
}

var monthDays = {
  'Jan': 31,
  'Feb': 28,
  'Mar': 31,
  'Apr': 30,
  'May': 31,
  'Jun': 30,
  'Jul': 31,
  'Aug': 31,
  'Sep': 30,
  'Oct': 31,
  'Nov': 30,
  'Dec': 31
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.setDayNumbers = this.setDayNumbers.bind(this);

  }

  componentDidMount() {

    var { type, payload } = this.props.getCalendarDays(0)

    this.props.selectDay({
      dayNumber: payload.currentDayNumber,
      monthIndex: Object.keys(months).indexOf(payload.current[1]),
      month: payload.current[1],
      year: payload.current[3]
    })

  }

  setDayNumbers() {

    var dayNumbers = [ [], [], [], [], [], [] ]

    if(Object.values(this.props.calendarDays).some(value => value === null)) return dayNumbers;

    var { current, currentDayNumber, selected, first, previous, next } = this.props.calendarDays

    var firstDayIndex = Object.keys(days).indexOf(first[0])
    var numDaysSelectedMonth = monthDays[selected[1]]
    var numDaysPreviousMonth = monthDays[previous[1]]

    var ii = 1
    var jj = 1

    for(var i = 0; i < 6; ++i) {
      for(var j = 0; j < 7; ++j) {

        if(j < firstDayIndex && ii <= firstDayIndex && jj <= 1) {

          dayNumbers[i][j] = {
            dayNumber: numDaysPreviousMonth - (firstDayIndex - j - 1),
            month: previous[1],
            monthIndex: Object.keys(months).indexOf(previous[1]),
            year: previous[3],
            today: false,
            selectedMonth: false
          }

          ii += 1

        } else if(firstDayIndex <= jj < numDaysSelectedMonth + firstDayIndex &&
          jj <= numDaysSelectedMonth) {

          dayNumbers[i][j] = {
            dayNumber: jj,
            month: selected[1],
            monthIndex: Object.keys(months).indexOf(selected[1]),
            year: selected[3],
            today: false,
            selectedMonth: true
          }

          if(jj === currentDayNumber && current[1] === selected[1]
             && current[3] === selected[3])
            dayNumbers[i][j].today = true

          ii = 1
          jj += 1

        } else if(jj > numDaysSelectedMonth) {

          dayNumbers[i][j] = {
            dayNumber: ii,
            month: next[1],
            monthIndex: Object.keys(months).indexOf(next[1]),
            year: next[3],
            today: false,
            selectedMonth: false
          }

          ii += 1

        }
      }
    }

    return dayNumbers;

  }

  render() {

    var dayNumbers = this.setDayNumbers();

    return(
      <div className='calendar'>
        <div className='calendar-left'>
          <CalendarInfoHeader
           selectedDay={ this.props.selectedDay }
           months={ months }/>
          <CalendarInfo>
            <CalendarInfoPanel { ...this.props } panelName={ 'Assignments' }/>
            <CalendarInfoPanel { ...this.props } panelName={ 'Events' }/>
            <CalendarInfoPanel { ...this.props } panelName={ 'Miscellaneous' }/>
          </CalendarInfo>
        </div>
        <div className='calendar-right'>
          <CalendarHeader
           calendarDays={ this.props.calendarDays }
           getCalendarDays={ this.props.getCalendarDays }
           months={ months }/>
          <CalendarDayNames/>
          <CalendarRows
           selectedDay={ this.props.selectedDay }
           selectDay={ this.props.selectDay }
           calendarIcons={ this.props.calendarIcons }
           dayNumbers={ dayNumbers }/>
        </div>
      </div>
    );
  }
}

export default Calendar
