import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Container, Row, Col} from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import whelp from '../../helpers/base'

var modal_style = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '70%',
    height                : '80%',
    overflow              : 'visible',
    margin                : '40px 0'
  }
}

class ItemsUpgrades extends Component {

  render() {
    return (
      <Container>
        <Row>
          { (this.props.items) ? (
            this.props.items.map((item) => (
              <Col key={item._id}>
              </Col>
            ))) : (
              <div>Loading...</div>
            )
          }
        </Row>
      </Container>
    );
  }
}

export default connect((store) => {
    return {
      items:  whelp.object.find(store, 'player', 'player', 'state', 'items')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(ItemsUpgrades)
