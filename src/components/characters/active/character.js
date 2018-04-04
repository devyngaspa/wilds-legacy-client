import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const Character = ({ character }) => (
  <tr>
    <td>{character.name}
    </td>
    <td>{character.character_tmpl.name}
    </td>
    <td>{character.occupation_text}
    </td>
  </tr>
)

export default Character
