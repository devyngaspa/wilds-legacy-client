import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EncountersContainer from './containers/encounters'
import ExpeditionsContainer from './containers/expeditions'
import CharactersContainer from './containers/characters'
import ItemsContainer from './containers/items'
import HomeContainer from './containers/home'

import Landing from './components/landing'
import setup from './setup'
import get_player from './actions/player'
import game_load from './actions/game'

global.socket = setup()

class App extends Component {

  componentDidMount() {
    this.props.appActions.get_player()
    this.props.appActions.game_load()
  }

  render() {
    return (
      <Router>
        <div>
          <Link to='/home'>
            <div style={{position: 'absolute', zIndex: 99999}}>Home</div>
          </Link>
          <Route path='/' exact={true} component={Landing}              />
          <Route path='/home'          component={HomeContainer}        />
          <Route path='/characters'    component={CharactersContainer}  />
          <Route path='/encounters'    component={EncountersContainer}  />
          <Route path='/expeditions'   component={ExpeditionsContainer} />
          <Route path='/items'         component={ItemsContainer}       />
        </div>
      </Router>
    );
  }
}

export default connect((store) => {
    return {
      player: store.player,
      game: store.game
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({ get_player, game_load }, dispatch)
    }
  })(App)
