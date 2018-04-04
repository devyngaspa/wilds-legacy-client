import games_load from '../api/games/load'

export default function load_game() {

  return (dispatch) => {
    return dispatch({
      type: 'GAME_LOAD',
      payload: games_load()
        .then(res => res.json())
        .then(data => {
          return data.game 
        })
    })
  }

}
