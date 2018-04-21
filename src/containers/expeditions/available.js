import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Container, Row, Col} from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AvailableQuest from '../../components/expeditions/available/quest'
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

class ExpeditionsAvailable extends Component {

  get_rewards_data (rewards) {
    return rewards.map((reward) => { 
      let obj = Object.assign({}, reward)
      if (reward.type === 'ItemTmpl') { obj.value = this.props.item_tmpls.find((item_tmpl) => { return item_tmpl._id === reward.id })}
      if (reward.type === 'Character') { obj.value = this.props.characters.find((character) => { return character._id === reward.id })}
      return obj
    })
  }

  get_quest_data (quest) {
    return {
      threats:    this.props.threats.filter((threat) => { return quest.threat_ids.includes(threat._id) }),
      quest_tmpl: this.props.quest_tmpls.find((quest_tmpl) => { return quest_tmpl._id === quest.quest_tmpl_id }),
      rewards:    this.get_rewards_data(quest.rewards),
      level:      this.props.levels.find((level) => { return level._id === quest.level_id }),
    }
  }

  get_quests () {
    return this.props.quests
      .filter((quest) => { return quest.state === 'active' })
      .sort((a, b) => { 
        if (a.difficulty === 'easy') { return -1 }
        else if (b.difficulty === 'easy') { return 1 }
        else if (a.difficulty === 'medium') { return -1 }
        else if (b.difficulty === 'medium') { return 1 }
        else { return 0 }
      })
      .map((quest) => { return Object.assign({}, quest, this.get_quest_data(quest)) })
  }

  render() {
    return (
      <Container>
        <Row>
          { (this.props.quests && this.props.threats && this.props.quest_tmpls) ? (
            this.get_quests().map((quest) => (
              <Col key={quest._id}>
                <AvailableQuest onClick={this.select_quest} key={quest._id} quest={quest}/>
              </Col>
            ))) : (
              <div>Loading...</div>
            )
          }
        </Row>
      </Container>
    );
  }
}

export default connect((store) => {
    return {
      quests:      whelp.object.find(store, 'player', 'player', 'state', 'quests'),
      threats:     whelp.object.find(store, 'game', 'game', 'threats'),
      quest_tmpls: whelp.object.find(store, 'game', 'game', 'quest_tmpls'),
      item_tmpls:  whelp.object.find(store, 'game', 'game', 'item_tmpls'),
      levels:      whelp.object.find(store, 'game', 'game', 'levels'),
      characters:  whelp.object.find(store, 'player', 'player', 'state', 'characters')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(ExpeditionsAvailable)
