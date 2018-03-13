import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Encounter from './components/encounter'
import setup from './setup'

global.socket = setup()

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path='/encounter' component={Encounter} />
        </div>
      </Router>
    );
  }
}

export default App;
