import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TurnCounter from './encounter/turn_counter'
import encounter_load from '../api/encounters/load'

class Encounter extends Component {
  state = {load: null}

  get_current_party = () => {
    let id = this.state.load.current_actor._id
    return this.state.load.parties.find( (p) => {return p.actor_ids.includes(id)} )
  }

  is_players_turn = () => {
    let party = this.get_current_party()
    return party.allegiance === 'player'
  }

  componentDidMount() {
    encounter_load('5a9c57695261785518c46578')
      .then(res => res.json())
      .then(encounter => 
        this.setState({ load: encounter })
        // fetch('/abilities/select', {ids: encounter.current_actor.ability_ids})
        //   .then(res => res.json())
        //   .then(abilities => 
        //     this.setState({ abilities_select: abilities })
        //   )
      )
  }

  render() {
    const load = this.state.load
    return (
      <div>
        {load ? (
          <div>
            <TurnCounter load={load} />
            <h1> It's {load.current_actor.name}'s turn </h1>
            {this.is_players_turn() ? ( <h3>Player's turn</h3> ) : ( <h3>Enemy's turn</h3> )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Encounter;
