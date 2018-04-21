import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PrivateRoute from '../components/common/private_route'

import EncountersContainer from './encounters'
import ExpeditionsContainer from './expeditions'
import CharactersContainer from './characters'
import ItemsContainer from './items'
import HomeContainer from './home'
import LoginContainer from './login'

import get_player from '../actions/player'
import game_load from '../actions/game'
import authenticate_user from '../actions/user'

import users_restore from '../api/users/restore'

import whelp from '../helpers/base'

import setup from '../setup'

const private_routes = [
  { path: '/home',        component: HomeContainer },
  { path: '/characters',  component: CharactersContainer },
  { path: '/encounters',  component: EncountersContainer },
  { path: '/expeditions', component: ExpeditionsContainer },
  { path: '/items',       component: ItemsContainer }
]

class PrivateContainer extends Component {
  state = { is_authenticating: true }

  componentDidMount () {
    let paths = private_routes.map((route) => { return route.path })
    let should_authenticate = paths.includes(this.props.location.pathname)
    if (should_authenticate) {
      users_restore()
        .then((response) => { return response.json() })
        .then((json) => { 
          let id = json.user._id;
          this.props.appActions.authenticate_user(id)
          global.socket = setup()
          this.props.appActions.get_player(id)
          this.props.appActions.game_load()
          this.setState({ is_authenticating: false })
        })
    }
  }

  render() {
    return (
      <div>
        { this.state.is_authenticating ? (
            <div>Authenticating...</div>
          ) : (
            private_routes.map((route) => ( <PrivateRoute key={route.path} {...route} /> ))
          )
        }
      </div>
    )
  }
}


export default withRouter(connect((store) => {
    return {
    }
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({ authenticate_user, get_player, game_load }, dispatch)
    }
  })(PrivateContainer))

