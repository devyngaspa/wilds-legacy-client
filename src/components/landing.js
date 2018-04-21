import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Background from '../assets/images/bg.jpg';

var bg_style = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundImage: `url(${Background})`,
  backgroundSize: '100% 100%'
}

var title_style = {
  fontSize: '160px',
  textAlign: 'center',
  marginTop: '325px',
  color: 'white',
  fontWeight: 'bold',
  fontStyle: 'italic',
  textShadow: '2px 2px black'
}

class Landing extends Component {

  render() {
    return (
      <div style={bg_style}>
        <h1 style={title_style}> WILDS </h1>
        <h1 style={{color: 'white', textAlign: 'center', fontStyle: 'italic'}}> An ancient evil defiles the great wilds</h1>
        <h1 style={{color: 'white', textAlign: 'center', fontStyle: 'italic'}}> Brave survivors band together to strike it down</h1>
      </div>
    );
  }
}

export default Landing;
