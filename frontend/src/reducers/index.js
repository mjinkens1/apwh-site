import { combineReducers } from 'redux'
import form from './formReducer'
import selectDay from './selectDay'
import getCalendarDays from './getCalendarDays'
import getViewData from './getViewData'
import setViewName from './setViewName'
import toggleSidebar from './toggleSidebar'
import contactSubmit from './contactSubmit'

export default combineReducers({
  selectDay,
  getCalendarDays,
  setViewName,
  getViewData,
  toggleSidebar,
  contactSubmit,
  form: form
});
