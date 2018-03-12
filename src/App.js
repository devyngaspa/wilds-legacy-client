import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Encounter from './components/encounter'
import io from 'socket.io-client';

class App extends Component {

  componentDidMount() {
    const socket = io('http://localhost:3001')
    socket.on('connect', () => {
      socket.emit('encounter.join', {room: 'encounter_5a9c57695261785518c46578', id: '5a9c57695261785518c46578'})
    })

    socket.on('encounter.state.update', (data) => {
      console.log("updated state:", data)
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Link to='/encounter'>Encounter</Link>

          <Route path='/encounter' component={Encounter} />
        </div>
      </Router>
    );
  }
}

export default App;
