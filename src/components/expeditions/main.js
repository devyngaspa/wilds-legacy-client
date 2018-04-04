import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import players_index from '../../api/players/index'
import Background from '../../assets/images/bg.jpg'
import { Container, Row, Col} from 'react-grid-system'
import TabList from '../common/tab_list'
import ExpeditionsAvailable from '../expeditions/available'
import ExpeditionsInProgress from '../expeditions/in_progress'
import ExpeditionsNew from '../expeditions/new'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const bg_style = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover'
}

const modal_style = {
  content : {
    width                 : '70%',
    minHeight             : '500px',
    overflow              : 'visible',
    margin                : '40px auto'
  }
}


class Expeditions extends Component {

  render() {
    const player = this.props.player.player;
    return (
      <div style={bg_style}>
        <Modal style={modal_style} isOpen={true}>
          { player.state ? (
            <div>
              <TabList tabs={
                [{key: 'available', to: '/expeditions/available', params: {}, label: 'Available'}, 
                {key: 'in_progress', to: '/expeditions/in-progress', params: {}, label: 'In Progress'}]
              } location={this.props.location}/>
              <Route path={'/expeditions/available'} component={ExpeditionsAvailable}/>
              <Route path={'/expeditions/in-progress'} component={ExpeditionsInProgress}/>
              <Route path={'/expeditions/new'} component={ExpeditionsNew}/>
            </div>
            ) : ( <div> Loading...</div>)
          }
        </Modal>
      </div>
    );
  }
}

export default withRouter(connect((store) => {
    return {
      player: store.player
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(Expeditions))
