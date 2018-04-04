import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

import AvailableQuestRewardCharacter from './reward/character'
import AvailableQuestRewardCurrency from './reward/currency'
import AvailableQuestRewardItemTmpl from './reward/item_tmpl'

class AvailableQuestReward extends Component {

  render() {
    const reward = this.props.reward;
    switch (reward.type) {
      case 'Character':
        return (<AvailableQuestRewardCharacter reward={reward}/>)
      case 'currency':
        return (<AvailableQuestRewardCurrency reward={reward}/>)
      case 'ItemTmpl':
        return (<AvailableQuestRewardItemTmpl reward={reward}/>)
    }
  }
}

export default AvailableQuestReward
