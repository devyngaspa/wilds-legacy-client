import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Container, Row, Col} from 'react-grid-system'
import TabList from '../common/tab_list'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Quest from './quest'

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

const obj_find = function (obj, ...args) {
  if (args.length === 0) { return obj }
  let prop = args[0]
  if (obj[prop] === undefined) { return undefined }
  return obj_find(obj[prop], ...args.slice(1))
}


class ExpeditionsAvailable extends Component {

  get_quest_data (quest) {
    return {
      threats:    this.props.threats.filter((threat) => { return quest.threat_ids.includes(threat._id) }),
      quest_tmpl: this.props.quest_tmpls.find((quest_tmpl) => { return quest_tmpl._id === quest.quest_tmpl_id })
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
          { (this.props.quests) ? (
            this.get_quests().map((quest) => (
              <Col key={quest._id}>
                <Quest onClick={this.select_quest} key={quest._id} quest={quest}/>
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
      quests:      obj_find(store, 'player', 'player', 'state', 'quests'),
      threats:     obj_find(store, 'game', 'game', 'threats'),
      quest_tmpls: obj_find(store, 'game', 'game', 'quest_tmpls')
    };
  }, (dispatch) => {
    return {
      appActions: bindActionCreators({}, dispatch)
    }
  })(ExpeditionsAvailable)
