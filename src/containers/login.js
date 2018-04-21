import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import whelp from '../helpers/base'

import authenticate_user from '../actions/user'
import auth_google from '../api/auth/google'

class LoginContainer extends Component {
  state = {
    redirect_to_referrer: false
  }

  login_via_google () {
    let path = this.location_state.from.pathname
    window.location.href = `http://localhost:3001/auth/google?from=${path}`
  }

  constructor (props) {
    super(props)
    this.login_via_google = this.login_via_google.bind(this)
    this.location_state   = this.props.location.state || { from: { pathname: '/home' }}
  }

  render() {
    const player = this.props.player;
    const game   = this.props.game;
    const { redirect_to_referrer } = this.state;

    if (redirect_to_referrer) {
      return ( <Redirect to={this.location_state.from} /> )
    }
    return (
      <div>
        <p> Login so we can keep track of your progress! </p>
        <button onClick={this.login_via_google}>Google+</button>
      </div>
    )
  }
}

export default withRouter(connect((store) => {
    return {
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({ authenticate_user }, dispatch)
    }
  })(LoginContainer))
