import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Background from '../assets/images/dashboard.png'

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

const area_style = {
  position: 'absolute'
}

const encounter_area_style = Object.assign({}, area_style, {
  height: '300px',
  width:  '400px',
  left:   '1200px'
})

const characters_area_style = Object.assign({}, area_style, {
  height: '300px',
  width:  '600px',
  left:   '700px',
  top:    '350px'
})

const expeditions_area_style = Object.assign({}, area_style, {
  height: '400px',
  width:  '450px',
  top:    '225px'
})

class HomeContainer extends Component {

  constructor (props) {
    super(props)
    this.goto_characters  = this.goto_characters.bind(this)
    this.goto_expeditions = this.goto_expeditions.bind(this)
  }

  goto_characters () {
    this.props.history.push('/characters/active')
  }

  goto_expeditions () {
    this.props.history.push('/expeditions/available')
  }

  render() {
    return (
      <div style={bg_style}>
        <div class='dashboard__area' style={encounter_area_style}></div>
        <div class='dashboard__area' onClick={this.goto_characters} style={characters_area_style}></div>
        <div class='dashboard__area' onClick={this.goto_expeditions} style={expeditions_area_style}></div>
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
  })(HomeContainer))

