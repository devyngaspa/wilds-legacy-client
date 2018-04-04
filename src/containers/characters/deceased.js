import React, { Component } from 'react'
import CharactersTable from './table'
import DeceasedCharacter from '../../components/characters/deceased/character'

class CharactersDeceased extends Component {

  constructor (props) {
    super(props)
    this.filter_fn = (character) => { return character.state === 'deceased' }
    this.sort_fn = (a, b) => { 
      if (a.name > b.name) { return 1 }
      else if (a.name < b.name) { return -1 }
      else { return 0 }
    }
  }

  render() {
    return (
      <CharactersTable filter_fn={this.filter_fn} sort_fn={this.sort_fn} table_headers={['Name', 'Class', 'Died On']} component={DeceasedCharacter}/>
    );
  }
}

export default CharactersDeceased
