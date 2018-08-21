// import { Map } from 'immutable';
import { TOGGLE_SIDEBAR } from '../actions'

const toggleSidebar = (state = {
  showSidebar: false,
}, action) => {

  switch (action.type) {

    case TOGGLE_SIDEBAR:

      return Object.assign({}, state, {
        showSidebar: !state.showSidebar,
      });

    default:
      return state;
  }
};

export default toggleSidebar
