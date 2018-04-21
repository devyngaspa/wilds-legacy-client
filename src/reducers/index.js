import { combineReducers } from 'redux'
import game from './game'
import player from './player'
import user from './user'

export default combineReducers({
  game,
  player,
  user
})
