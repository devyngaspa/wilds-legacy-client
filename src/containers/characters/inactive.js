import React, { Component } from 'react'
import CharactersTable from './table'
import InactiveCharacter from '../../components/characters/inactive/character'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import whelp from '../../helpers/base'

class CharactersInactive extends Component {

  constructor (props) {
    super(props)
    this.filter_fn = (character) => { return character.state === 'inactive' }
    this.sort_fn = (a, b) => { 
      if (a.name > b.name) { return 1 }
      else if (a.name < b.name) { return -1 }
      else { return 0 }
    }
  this.submit  = this.submit.bind(this);
  this.refresh = this.refresh.bind(this);
  }

  submit (character) {
    let character_id = character._id;
    let player_id    = this.props.player._id;
    let room         = this.props.player.room;
    global.socket.emit('character.activate', { character_id, player_id, room });
  }

  refresh () {
    let id    = this.props.player._id;
    let room  = this.props.player.room;
    global.socket.emit('player.refresh_characters', { id, room });
  }

  render() {
    return (
      <div>
        <button onClick={this.refresh}>Refresh</button>
        <CharactersTable filter_fn={this.filter_fn} sort_fn={this.sort_fn} on_click={this.submit} component={InactiveCharacter}/>
      </div>
    );
  }
}

export default withRouter(connect((store) => {
    return {
      player: whelp.object.find(store, 'player', 'player'),
      game:   whelp.object.find(store, 'game', 'game')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(CharactersInactive))

