var dcopy = require('deep-copy')

const initial_state = {
  user: {},
  is_authenticated: false
}

export default function user(state = initial_state, action) {

  switch (action.type) {
    case "USER_AUTHENTICATE":
      return {
        ...state,
        is_authenticated: true
      }
    default:
      return state
  }

  switch (action.type) {
    case "USER_SET_ID":
      return {
        ...state,
        user: Object.assign(dcopy(state.user), { _id: action.payload })
      }
    default:
      return state
  }

}
