import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Encounter from '../components/encounters/main'

class EncountersContainer extends Component {

  render() {
    return (
      <div>
        <Encounter/>
      </div>
    );
  }
}

export default EncountersContainer;
