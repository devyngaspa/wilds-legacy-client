import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Dashboard extends Component {
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
        global.player      = data.player
        const id           = data.player._id
        const room         = 'player_' + id
        global.player_room = room
        global.socket.on('player.state.update', (data) => {
          console.log("data", data)
          this.setState({ load: data })
        })
        global.socket.emit('player.join', { id, room });
      })
  }

  componentWillUnmount() {
    global.socket.emit('player.leave', { id: global.player._id, room: global.player_room })
  }

  render() {
    const load = this.state.load
    console.log("load", load)
    return (
      <div>
        <h1> DASHBOARD </h1>
        <h3> QUESTS: </h3>
        {load ? (
          <ul> 
            {load.quests.map(quest => (
              <li key={quest._id}> {quest.name} </li>
            ))}
          </ul>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
