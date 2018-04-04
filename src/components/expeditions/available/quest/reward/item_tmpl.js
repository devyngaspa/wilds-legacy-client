import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const AvailableQuestRewardItemTmpl = ({ reward }) => (
  <li>
    {reward.value.name}
  </li>
)

export default AvailableQuestRewardItemTmpl
