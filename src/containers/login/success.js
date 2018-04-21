import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import whelp from '../../helpers/base'

import authenticate_user from '../../actions/user'
import auth_google from '../../api/auth/google'
import users_restore from '../../api/users/restore'

class LoginSuccessContainer extends Component {

  componentWillMount () {
    // let qp = whelp.get_query_params(this.props.location)
    // let id = qp.id;
    // if (id) { 
    //   this.props.appActions.authenticate_user(id) 
    //   this.props.history.push('/home')
    // }
    users_restore()
      .then((response) => { return response.json() })
      .then((json) => { 
        let id = json.user._id;
        this.props.appActions.authenticate_user(id)
        this.props.history.push('/home')
      })
  }

  render() {
    return (<div></div>)
  }
}

export default withRouter(connect((store) => {
    return {
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({ authenticate_user }, dispatch)
    }
  })(LoginSuccessContainer))
