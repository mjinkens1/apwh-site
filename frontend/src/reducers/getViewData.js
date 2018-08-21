import { GET_VIEW_DATA } from '../actions'

const getViewData = (state = {
  subView: 'initialView'
}, action) => {

  switch (action.type) {

    case GET_VIEW_DATA:

    switch (action.payload.subView) {

      case 'SYLLABUS':
        return Object.assign({}, state, {
          subView: 'syllabus'
        });

      case 'TECH':
        return Object.assign({}, state, {
          subView: 'tech'
        });

      case 'ORGANIZATION':
        return Object.assign({}, state, {
          subView: 'organization'
        });

        case 'REGIONAL':
          return Object.assign({}, state, {
            subView: 'regional'
          });

        case 'GLOBAL':
          return Object.assign({}, state, {
            subView: 'global'
          });

        case 'INDUSTRIAL':
          return Object.assign({}, state, {
            subView: 'industrial'
          });

        case 'ACCELERATING':
          return Object.assign({}, state, {
            subView: 'accelerating'
          });

        case 'EMAIL':
          return Object.assign({}, state, {
            subView: 'email'
          });

      default:
        return state;
    }

    default:
      return state;
  }
}

export default getViewData
