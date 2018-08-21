import { SELECT_DAY } from '../actions'


const selectDay = (state = {
  selectedDay: {
    date: ['No Date Selected'],
    dayNumber: null,
    month: null,
    year: null,
  }
}, action) => {

  switch (action.type) {

    case SELECT_DAY:

      return Object.assign({}, state, {
        selectedDay: action.payload
      });

    default:
      return state;
  }
}

export default selectDay
