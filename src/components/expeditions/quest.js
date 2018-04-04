import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const Quest = ({ quest }) => (
  <Link to={`/expeditions/new?quest_id=${quest._id}`}>
    <h1>{quest.quest_tmpl.name}
    </h1>
    <h3>{quest.objective}
    </h3>
    <p>{quest.difficulty}</p>
    <p>XP: {quest.xp}</p>
    <p>Est. Duration: {quest.duration}</p>
    <ul>
      { quest.threats.map(threat => ( <li key={threat._id}>{threat.name}</li> )) }
    </ul>
  </Link>
)

export default Quest
