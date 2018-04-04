import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Tab from './tab_list/tab'

const TabList = ({ tabs, location }) => (
  <div>
    <ul class='modal-tab__list'>
      {
        tabs.map(tab => (
          <Tab key={tab.key} location={location} label={tab.label} to={tab.to} params={tab.params}/>
      ))}
    </ul>
  </div>
)

export default TabList
