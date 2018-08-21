import { connect } from 'react-redux';
import { App } from '../components/App';
import {
  selectDay,
  setViewName,
  getViewData,
  toggleSidebar,
  getCalendarDays,
  contactSubmit,
  closePopup
 } from '../actions';


const mapStateToProps = state => ({
  selectedDay: state.selectDay.selectedDay,
  calendarDays: state.getCalendarDays.calendarDays,
  viewName: state.setViewName.viewName,
  showSidebar: state.toggleSidebar.showSidebar,
  formData: state.contactSubmit.formData,
  formStatus: state.contactSubmit.formStatus,
  didRecieve: state.contactSubmit.didRecieve,
  showPopup: state.contactSubmit.showPopup
});

const mapDispatchToProps = dispatch => ({
  selectDay: (day) => dispatch(selectDay(day)),
  getCalendarDays: (selectedMonth) => dispatch(getCalendarDays(selectedMonth)),
  setViewName: (viewName) => dispatch(setViewName(viewName)),
  getViewData: (view) => dispatch(getViewData(view)),
  toggleSidebar: () => dispatch(toggleSidebar()),
  closePopup: () => dispatch(closePopup()),
  handleSubmit: (formData) => dispatch(contactSubmit(formData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
