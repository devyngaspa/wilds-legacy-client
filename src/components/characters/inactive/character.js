import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const Character = ({ character, on_click }) => (
  <li>
    <Container>
      <Row>
        <Col>{character.name}
        </Col>
        <Col>{character.character_tmpl.name}
        </Col>
        <Col> 400g
        </Col>
        <Col> 
          <button onClick={() => { return on_click(character) }}>Recruit</button>
        </Col>
      </Row>
    </Container>
  </li>
)

export default Character
