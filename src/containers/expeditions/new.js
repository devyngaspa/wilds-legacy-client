import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Container, Row, Col} from 'react-grid-system'
import ExpeditionsNewCharacters from '../../components/expeditions/new/characters'
import ExpeditionsNewQuest from '../../components/expeditions/new/quest'
import expeditions_create from '../../api/expeditions/create'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import whelp from '../../helpers/base'

class ExpeditionsNew extends Component {
  state = { selected_characters: [] }

  constructor (props) {
    super(props)
    this.toggle_select_character = this.toggle_select_character.bind(this)
    this.submit                  = this.submit.bind(this)
  }

  get_threat_is_countered (threat, character) {
    const counter_ids      = threat.counter_ids
    const abilities        = character.abilities
    const ability_tmpl_ids = abilities.map((ability) => { return ability.ability_tmpl_id })
    return !!(counter_ids.find((counter_id) => { return ability_tmpl_ids.includes(counter_id) }))
  }

  get_occupation_text (occupation) {
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
    const game            = this.props.game
    const character_tmpl  = game.character_tmpls.find((character_tmpl) => { return character.character_tmpl_id === character_tmpl._id })
    const threats         = this.get_quest().threats
    const counters        = threats.filter((threat) => { return this.get_threat_is_countered(threat, character) })
    const occupation_text = this.get_occupation_text(character.occupation)

    return Object.assign({}, character, { character_tmpl, counters, occupation_text })
  }

  get_characters () {
    const characters = whelp.object.find(this.props, 'player', 'state', 'characters')
    if (!characters) { return [] }
    return characters.map((character) => { return this.get_character_data(character) })
  }

  get_quests() {
    return whelp.object.find(this.props, 'player', 'state', 'quests')
  }

  get_quest () {
    const params  = new URLSearchParams(this.props.location.search.slice(1))
    const id      = params.get('quest_id')
    const quests  = this.get_quests()
    const quest   = quests.find((quest) => { return quest._id === id })
    const threats = this.props.game.threats.filter((threat) => { return quest.threat_ids.includes(threat._id) })
    return Object.assign({}, quest, { threats: threats })
  }

  toggle_select_character (character) {
    const ids = this.state.selected_characters.map((character) => { return character._id })
    if (ids.includes(character._id)) { 
      this.setState({ selected_characters: this.state.selected_characters.filter((item) => { return item._id !== character._id })})
    }
    else {
      this.setState({ selected_characters: this.state.selected_characters.concat([character])})
    }
  }

  submit () {
    let params = {
      quest_id:      this.get_quest()._id,
      character_ids: this.state.selected_characters.map((character) => { return character._id }),
      player_id:     this.props.player._id
    }
    expeditions_create(params)
      .then(res => res.json())
      .then(data => {
        this.props.history.push('/expeditions/in-progress')
      })
  }

  render() {
    return (
      <div>
        <h2>New Expedition</h2>
        <Container>
          <Row>
            <Col>
              <ExpeditionsNewCharacters characters={this.get_characters()} select={this.toggle_select_character}/>
            </Col>
            <Col>
              <ExpeditionsNewQuest quest={this.get_quest()}/>
              <h4>Selected characters:</h4>
              <ul>
                { this.state.selected_characters.map((character) => (
                  <li key={character._id}>{character.name}</li>
                  ))
                }
              </ul>
            </Col>
          </Row>
          <Row>
            <button onClick={this.submit}>Embark</button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect((store) => {
    return {
      player: whelp.object.find(store, 'player', 'player'),
      game:   whelp.object.find(store, 'game', 'game')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(ExpeditionsNew)

