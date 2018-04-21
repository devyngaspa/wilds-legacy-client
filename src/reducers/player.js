var dcopy = require('deep-copy')

const initial_state = {
  is_fetching: false,
  is_received: false,
  player: {},
}

export default function player(state = initial_state, action) {

  switch (action.type) {
    case "PLAYER_SHOW_PENDING":
      return {
        ...state,
        is_fetching: true
      }
    case "PLAYER_SHOW_FULFILLED":
      console.log("action", action)
      return {
        ...state,
        is_fetching: false,
        is_received: true,
        player: Object.assign(dcopy(state.player), action.payload)
      }
    case "PLAYER_SHOW_REJECTED":
      return {
        ...state,
        is_fetching: false,
        is_received: true
      }

    case "PLAYER_ROOM_JOIN":
      return {
        ...state,
        player: Object.assign(dcopy(state.player), {room: action.payload})
      }

    case "PLAYER_STATE_UPDATE":
      return {
        ...state,
        player: Object.assign(dcopy(state.player), {state: action.payload})
      }

    case "EXPEDITION_MOCK_UPDATE":
      return {
        ...state,
        player: Object.assign(dcopy(state.player), {mock: action.payload})
      }

    default:
      return state
  }

}
