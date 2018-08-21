// import { Map } from 'immutable';
import { SET_VIEW_NAME } from '../actions'

const setViewName = (state = {
  viewName: '',
}, action) => {

  switch (action.type) {

    case SET_VIEW_NAME:

      return Object.assign({}, state, {
        viewName: action.payload.viewName,
      });

    default:
      return state;
  }
};

export default setViewName
