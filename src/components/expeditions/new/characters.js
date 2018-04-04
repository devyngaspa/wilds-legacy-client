import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const ExpeditionsNewCharacters = ({ characters, select }) => (
  <div>
    <h3>Available Characters</h3>
    <div>
      { characters ? (
        <ul>
          { characters.map((character) => (
            <li>
              <h4 onClick={() => { return select(character) }}>{character.name}</h4>
              <b>{character.character_tmpl.name}</b>
              <b>{character.occupation_text}</b>
              <p> Counters: </p>
              <ul>
                { character.counters.map((counter) => (
                  <li>{counter.name}</li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ul>
        ) : (
          <p> No Characters </p>
        )}
    </div>
  </div>

)

export default ExpeditionsNewCharacters
