import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import players_index from '../api/players/index'

class Expeditions extends Component {
  state = {load: null}

  // is_players_turn = () => {
  //   let party = this.state.load.current_party
  //   return party.allegiance === 'player'
  // }

  constructor() {
    super()
    players_index()
      .then(res => res.json())
      .then(data => {
        global.player = data.player
        const quest_ids = global.player.quest_ids
        const expedition_ids = global.player.expedition_ids
        // const id      = data.player.encounter_id
        // const room    = 'encounter_' + id
        // global.room   = room
        // global.socket.on('encounter.state.update', (data) => {
        //   console.log("data", data)
        //   this.setState({ load: data })
        //   let state = data.encounter.encounter_states.length - 1
        //   let current_party = data.current_party
        //   if (current_party.allegiance === 'enemy') {
        //     global.socket.emit('encounter.state.next', { id, room, state });
        //   }
        // })
        // global.socket.emit('encounter.join', { id, room });
      })
  }

  // componentWillUnmount() {
  //   global.socket.emit('encounter.leave', { id: global.player.encounter_id, room: global.room })
  // }

  render() {
    const load = this.state.load
    return (
      <div>
      </div>
    );
  }
}

export default Expeditions;
