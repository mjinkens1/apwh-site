import {
  SUBMIT_FORM,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
  CLOSE_POPUP
} from '../actions'


const contactSubmit = (state = {
  formData: {
    name: '',
    email: '',
    message: ''
  },
  formStatus: {
    header: 'Sending...',
    message: ''
  },
  didRecieve: false,
  showPopup: false,
}, action) => {

  switch (action.type) {

    case SUBMIT_FORM:

      return Object.assign({}, state, {
        formData: action.payload.formData,
        showPopup: true,
      });

    case SUBMIT_SUCCESS:

      var firstName = state.formData.name.split(' ')[0]

      return Object.assign({}, state, {
        didRecieve: true,
        formStatus: {
          header: 'Thanks!',
          message: `${firstName}, thanks for getting in touch.  I'll get back to you as soon as possible!`
        }
      });

    case SUBMIT_FAILURE:

      console.error(action.payload.error);

      return Object.assign({}, state, {
        didRecieve: false,
        formStatus: {
          header: 'Oh No!',
          message: 'Something went wrong while sending your message, please try again.'
        }
      });

    case CLOSE_POPUP:

      return Object.assign({}, state, {
        showPopup: false,
        formStatus: {
          header: 'Sending...',
          message: ''
        },
      });

    default:
      return state;
  }
};

export default contactSubmit;
