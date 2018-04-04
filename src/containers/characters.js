import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import Background from '../assets/images/bg.jpg'
import { Container, Row, Col} from 'react-grid-system'
import TabList from '../components/common/tab_list'
import CharactersActive from './characters/active'
import CharactersInactive from './characters/inactive'
import CharactersDeceased from './characters/deceased'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import whelp from '../helpers/base'

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

class CharactersContainer extends Component {

  render() {
    const player = this.props.player;
    return (
      <div style={bg_style}>
        <Modal style={modal_style} isOpen={true}>
          { player.state ? (
            <div>
              <TabList tabs={
                [{key: 'active',  to: '/characters/active',   params: {}, label: 'Active'}, 
                {key: 'inactive', to: '/characters/inactive', params: {}, label: 'Recruit'},
                {key: 'deceased', to: '/characters/deceased', params: {}, label: 'Deceased'}]
              } location={this.props.location}/>
              <h1>Characters</h1>
              <Route path={'/characters/active'} component={CharactersActive}/>
              <Route path={'/characters/inactive'} component={CharactersInactive}/>
              <Route path={'/characters/deceased'} component={CharactersDeceased}/>
            </div>
            ) : ( <div> Loading...</div> )
          }
        </Modal>
      </div>
    );
  }
}

export default withRouter(connect((store) => {
    return {
      player: whelp.object.find(store, 'player', 'player')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(CharactersContainer))
