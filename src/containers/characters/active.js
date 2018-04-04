import React, { Component } from 'react'
import CharactersTable from './table'
import ActiveCharacter from '../../components/characters/active/character'

class CharactersActive extends Component {

  constructor (props) {
    super(props)
    this.filter_fn = (character) => { return character.state === 'active' }
    this.sort_fn = (a, b) => { 
      if (a.occupation_text > b.occupation_text) { return 1 }
      else if (a.occupation_text < b.occupation_text) { return -1 }
      else {
        if (a.name > b.name) { return 1 }
        else if (a.name < b.name) { return -1 }
        else { return 0 }
      }
    }
  }

  render() {
    return (
      <CharactersTable filter_fn={this.filter_fn} sort_fn={this.sort_fn} table_headers={['Name', 'Class', 'Status']} component={ActiveCharacter}/>
    );
  }
}

export default CharactersActive
