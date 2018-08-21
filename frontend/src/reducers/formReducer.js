import { reducer as formReducer } from 'redux-form'
import { SUBMIT_SUCCESS } from '../actions'


const form = formReducer.plugin({
  contactSubmit: (state, action) => {   // <----- 'login' is name of form given to reduxForm()

    switch(action.type) {

      case SUBMIT_SUCCESS:

        return undefined;

      default:
        return state
    }
  }
})

export default form
