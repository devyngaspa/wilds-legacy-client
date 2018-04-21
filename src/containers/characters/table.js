import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Character from '../../components/characters/character'
import whelp from '../../helpers/base'

class CharactersTable extends Component {

  get_occupation_text (character) {
    let occupation = character.occupation
    if (!occupation) { return 'Ready' }
    switch (occupation.type) {
      case 'Expedition':
        return 'On Expedition'
      case 'Encounter':
        return 'In Encounter'
      default:
        return 'Ready'
    }
  }

  get_character_data (character) {
    return {
      character_tmpl: this.props.character_tmpls.find((character_tmpl) => { return character_tmpl._id === character.character_tmpl_id }),
      level: this.props.levels.find((level) => { return level._id === character.level_id }),
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
    const CharacterComponent = this.props.component ? this.props.component : Character
    return (
      <ul>
        { (this.props.character_tmpls && this.props.levels && this.props.characters) ? (
          this.get_characters().map((character) => (
            <CharacterComponent key={character._id} character={character} on_click={this.props.on_click}/>
          ))) : (
            <div>No characters to display</div>
          )
        }
      </ul>
    );
  }
}

export default connect((store) => {
    return {
      character_tmpls: whelp.object.find(store, 'game', 'game', 'character_tmpls'),
      levels:          whelp.object.find(store, 'game', 'game', 'levels'),
      characters:      whelp.object.find(store, 'player', 'player', 'state', 'characters')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(CharactersTable)
