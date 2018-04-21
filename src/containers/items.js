import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import Background from '../assets/images/bg.jpg'
import { Container, Row, Col} from 'react-grid-system'
import TabList from '../components/common/tab_list'
import ItemsInventory from './items/inventory'
import ItemsWares from './items/wares'
import ItemsUpgrades from './items/upgrades'

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
    margin                : '40px auto',
    overflow              : 'visible'
  }
}

class ItemsContainer extends Component {

  render() {
    const player = this.props.player;
    const game   = this.props.game;
    return (
      <div style={bg_style}>
        <Modal style={modal_style} isOpen={true}>
          { (player.state && game) ? (
            <div>
              <TabList tabs={
                [{key: 'items',  to: '/items/inventory',   params: {}, label: 'Inventory'}, 
                {key: 'wares', to: '/items/wares', params: {}, label: 'Buy/Sell'},
                {key: 'upgrades', to: '/items/upgrades', params: {}, label: 'Upgrades'}]
              } location={this.props.location}/>
              <h1>Items</h1>
              <Route path={'/items/inventory'} component={ItemsInventory}/>
              <Route path={'/items/wares'} component={ItemsWares}/>
              <Route path={'/items/upgrades'} component={ItemsUpgrades}/>
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
      player: whelp.object.find(store, 'player', 'player'),
      game:   whelp.object.find(store, 'game', 'game')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(ItemsContainer))
