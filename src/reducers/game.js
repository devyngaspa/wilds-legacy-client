var dcopy = require('deep-copy')

const initial_state = {
  is_fetching: false,
  is_received: false,
  game: {},
}

export default function game(state = initial_state, action) {

  switch (action.type) {
    case "GAME_LOAD_PENDING":
      return {
        ...state,
        is_fetching: true
      }
    case "GAME_LOAD_FULFILLED":
      return {
        ...state,
        is_fetching: false,
        is_received: true,
        game: Object.assign(dcopy(state.game), action.payload)
      }
    case "GAME_LOAD_REJECTED":
      return {
        ...state,
        is_fetching: false,
        is_received: true
      }

    default:
      return state
  }

}
