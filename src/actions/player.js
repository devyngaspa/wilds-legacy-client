import players_show from '../api/players/show'

function get_player_room_name (player) {
  return 'player_' + player._id
}

function player_room_join (player, dispatch) {
  let id   = player._id
  let room = get_player_room_name(player)
  global.socket.on('player.state.update', (state) => {
    dispatch({
      type: 'PLAYER_STATE_UPDATE',
      payload: state
    })
  })
  global.socket.on('expedition.mock.update', (state) => {
    dispatch({
      type: 'EXPEDITION_MOCK_UPDATE',
      payload: state
    })
  })
  global.socket.emit('player.join', { id, room });
  dispatch({
    type: 'PLAYER_ROOM_JOIN',
    payload: room
  })
}

export default function get_player(user_id) {

  return (dispatch) => {
    return dispatch({
      type: 'PLAYER_SHOW',
      payload: players_show({ user_id })
        .then(res => res.json())
        .then(data => { 
          player_room_join(data.player, dispatch)
          return data.player 
        })
    })
  }

}
