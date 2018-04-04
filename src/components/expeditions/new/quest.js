import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const ExpeditionsNewQuest = ({ quest }) => (
  <div>
    <h3>Quest</h3>
    <b>{quest.name}</b>
    <h5>Threats:</h5>
    <ul>
      {quest.threats.map((threat) => (
        <li key={threat._id}>{threat.name}</li>
      ))}
    </ul>
  </div>
)

export default ExpeditionsNewQuest
