import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Expeditions from '../components/expeditions/main'

class ExpeditionsContainer extends Component {

  render() {
    return (
      <div>
        <Expeditions/>
      </div>
    );
  }
}

export default ExpeditionsContainer;
