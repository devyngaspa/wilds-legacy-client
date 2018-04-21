import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TurnCounter from './encounter/turn_counter'
import ActionMenu from './encounter/action_menu'
import EncounterLog from './encounter/log'

class Encounter extends Component {
  state = {load: null}

  is_players_turn = () => {
    let party = this.state.load.current_party
    return party.allegiance === 'player'
  }

  constructor() {
    super()
    players_index()
      .then(res => res.json())
      .then(data => {
        global.player = data.player
        const id      = data.player.encounter_id
        const room    = 'encounter_' + id
        global.room   = room
        global.socket.on('encounter.state.update', (data) => {
          this.setState({ load: data })
          let state = data.encounter.encounter_states.length - 1
          let current_party = data.current_party
          if (current_party.allegiance === 'enemy') {
            global.socket.emit('encounter.state.next', { id, room, state });
          }
        })
        global.socket.emit('encounter.join', { id, room });
      })
  }

  componentWillUnmount() {
    global.socket.emit('encounter.leave', { id: global.player.encounter_id, room: global.room })
  }

  render() {
    const load = this.state.load
    return (
      <div>
        {load ? (
          <div style={{display: 'flex'}}>
            <div style={{flex: '50%'}}>
              <TurnCounter load={load} />
              <h1> {load.current_party.allegiance.toUpperCase()}'S TURN ({load.current_actor.name}) </h1>
              <div>
                {this.is_players_turn() && (
                <ActionMenu load={load} />
                )}
              </div>
            </div>
            <div style={{flex: '50%'}}>
              <EncounterLog load={load} />
            </div>
          </div>
        ) : ( <div>Loading...</div> )}
      </div>
    );
  }
}

export default Encounter;
