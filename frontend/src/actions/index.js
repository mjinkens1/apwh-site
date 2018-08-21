import fetch from 'cross-fetch'


export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const SET_VIEW_NAME = 'SET_VIEW_NAME'
export const GET_VIEW_DATA = 'GET_VIEW_DATA'
export const GET_CALENDAR_DAYS = 'GET_CALENDAR_DAYS'
export const SELECT_DAY = 'SELECT_DAY'
export const SUBMIT_FORM = 'SUBMIT_FORM'
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE'
export const CLOSE_POPUP = 'CLOSE_POPUP'


export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: {}
  }
}

export const getCalendarDays = (monthIndex) => {

  var current = new Date()
  var first = new Date(current.getFullYear(), current.getMonth() + monthIndex)
  var selected = new Date(current.getFullYear(), current.getMonth() + monthIndex, current.getDate())
  var previous = new Date(current.getFullYear(), current.getMonth() + monthIndex - 1, current.getDate())
  var next = new Date(current.getFullYear(), current.getMonth() + monthIndex + 1, current.getDate())

  return {
    type: GET_CALENDAR_DAYS,
    payload: {
      monthIndex,
      currentDayNumber: current.getDate(),
      current: current.toDateString().split(' '),
      first: first.toDateString().split(' '),
      selected: selected.toDateString().split(' '),
      previous: previous.toDateString().split(' '),
      next: next.toDateString().split(' ')
    }
  }
}


export const selectDay = (day) => {

  console.log(day.monthIndex)

  var selectedDay = new Date(day.year, day.monthIndex, day.dayNumber)

  return {
    type: SELECT_DAY,
    payload: {
      date: selectedDay.toDateString().split(' '),
      dayNumber: day.dayNumber,
      month: day.month,
      year: day.year
    }
  }
}

export const setViewName = viewName => {
  return {
    type: SET_VIEW_NAME,
    payload: { viewName }
  }
}

export const submitForm = formData => {
  return {
    type: SUBMIT_FORM,
    payload: { formData }
  }
}

export const submitSuccess = json => {
  return {
    type: SUBMIT_SUCCESS,
    payload: { json }
  }
}

export const submitFailure = error => {
  return {
    type: SUBMIT_FAILURE,
    payload: { error }
  }
}

export const closePopup = () => {
  return {
    type: CLOSE_POPUP,
    payload: {}
  }
}

export const getViewData = view => {
  /*TO DO - change to async function creator*/
  return {
    type: GET_VIEW_DATA,
    payload: { view }
  }
}

export const contactSubmit = (formData) => {

  return dispatch => {
    dispatch(submitForm(formData))
    return fetch('http://mjinkens.com/send-message', {
      method:'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {

      if(response.status !== 200)
        throw response.status

      response.json()

    }).then(json => dispatch(submitSuccess(json)))
    .catch(error => dispatch(submitFailure(error)))
  }
}
