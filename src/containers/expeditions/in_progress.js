import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Container, Row, Col} from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Expedition from '../../components/expeditions/in_progress/expedition'
import whelp from '../../helpers/base'

var modal_style = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '70%',
    height                : '80%',
    overflow              : 'visible',
    margin                : '40px 0'
  }
}

class ExpeditionsInProgress extends Component {

  get_quest_data (quest) {
    return {
      quest_tmpl: this.props.quest_tmpls.find((quest_tmpl) => { return quest_tmpl._id === quest.quest_tmpl_id })
    }
  }

  get_expedition_data (expedition) {
    return { 
      quest:      this.get_quest_data(this.props.quests.find((quest) => { return expedition.quest_id === quest._id })),
      characters: this.props.characters.filter((character) => { return expedition.character_ids.includes(character._id) }),
      player: this.props.player
    }
  }

  get_expeditions () {
    return this.props.expeditions
      .filter((expedition) => { return expedition.state === 'active' })
      .map((expedition) => { return Object.assign({}, expedition, this.get_expedition_data(expedition)) })
  }

  render() {
    return (
      <ul>
        { (this.props.expeditions && this.props.quests && this.props.quest_tmpls && this.props.characters && this.props.player) ? (
          this.get_expeditions().map((expedition) => (
            <Expedition key={expedition._id} expedition={expedition} player={this.props.player}/>
          ))) : (
            <div>Loading...</div>
          )
        }
      </ul>
    );
  }
}

export default connect((store) => {
    return {
      expeditions: whelp.object.find(store, 'player', 'player', 'state', 'expeditions'),
      quests:      whelp.object.find(store, 'player', 'player', 'state', 'quests'),
      characters:  whelp.object.find(store, 'player', 'player', 'state', 'characters'),
      player:      whelp.object.find(store, 'player', 'player'),
      quest_tmpls: whelp.object.find(store, 'game', 'game', 'quest_tmpls')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(ExpeditionsInProgress)
