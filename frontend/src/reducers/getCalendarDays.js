import { GET_CALENDAR_DAYS } from '../actions'


const getCalendarDays = (state = {
  calendarDays: {
    monthIndex: 0,
    first: null,
    current: null,
    selected: null,
    previous: null,
    next: null
  }
}, action) => {

  switch (action.type) {

    case GET_CALENDAR_DAYS:

      return Object.assign({}, state, {
        calendarDays: action.payload
      });

    default:
      return state;
  }
}

export default getCalendarDays
