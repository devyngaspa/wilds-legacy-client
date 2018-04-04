import { combineReducers } from 'redux'
import game from './game'
import player from './player'

export default combineReducers({
  game,
  player
})
