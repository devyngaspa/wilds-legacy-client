import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Character from '../../components/characters/character'
import whelp from '../../helpers/base'

const table_style = {
  width: '100%'
}

class CharactersTable extends Component {

  get_occupation_text (character) {
    let occupation = character.occupation
    if (!occupation) { return 'Available' }
    switch (occupation.type) {
      case 'Expedition':
        return 'On Expedition'
      case 'Encounter':
        return 'In Encounter'
      default:
        return 'Available'
    }
  }

  get_character_data (character) {
    return {
      character_tmpl: this.props.character_tmpls.find((character_tmpl) => { return character_tmpl._id === character.character_tmpl_id }),
      occupation_text: this.get_occupation_text(character)
    }
  }

  get_characters () {
    return this.props.characters ? (this.props.characters
      .map((character) => { return Object.assign({}, character, this.get_character_data(character)) }))
      .filter(this.props.filter_fn)
      .sort(this.props.sort_fn)
      : ( [] )
  }

  render() {
    const characters         = this.get_characters()
    const CharacterComponent = this.props.component ? this.props.component : Character
    const table_headers      = this.props.table_headers
    return (
      <table style={table_style}>
        <thead>
          <tr>
            { (table_headers) ? (
              table_headers.map((table_header) => (<th style={{textAlign: 'left'}}>{table_header}</th>))
              ) : (
                <tr>
                </tr>
              )
            }
          </tr>
        </thead>
        <tbody>
          { (characters.length) ? (
            characters.map((character) => (
              <CharacterComponent key={character._id} character={character}/>
            ))) : (
              <div>No characters to display</div>
            )
          }
        </tbody>
      </table>
    );
  }
}

export default connect((store) => {
    return {
      character_tmpls: whelp.object.find(store, 'game', 'game', 'character_tmpls'),
      characters:      whelp.object.find(store, 'player', 'player', 'state', 'characters')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(CharactersTable)
