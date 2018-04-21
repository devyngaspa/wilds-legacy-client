import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoginContainer from './containers/login'
import LoginSuccessContainer from './containers/login/success'
import Landing from './components/landing'
import PrivateContainer from './containers/private'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Link to='/home'>
            <div style={{position: 'absolute', zIndex: 99999}}>Home</div>
          </Link>

          <Route path='/' exact={true}      component={Landing}               />
          <Route path='/login' exact={true} component={LoginContainer}        />
          <Route path='/login/success'      component={LoginSuccessContainer} cookie={document.cookie} />
          <PrivateContainer/>
        </div>
      </Router>
    );
  }
}

export default connect((store) => {
    return {
    }
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(App)
