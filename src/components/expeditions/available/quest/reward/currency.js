import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

const AvailableQuestRewardCurrency = ({ reward }) => (
  <li>
    {reward.value}g
  </li>
)

export default AvailableQuestRewardCurrency
