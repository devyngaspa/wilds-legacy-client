import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const label_style = {
  textAlign: 'center',
  margin: '0'
}

const get_class_names = (to, location) => {
  let class_names = ['modal-tab__item'];
  if (to === location.pathname) { class_names.push('active') }
  return class_names.join(' ')
}

const Tab = ({ key, location, label, to, params }) => (
  <li class={get_class_names(to, location)}>
    { to ? (
      <Link to={to} {...params}>
        <h3 style={label_style}>{label}</h3>
      </Link>
      ) : ( <h3 style={label_style}>{label}</h3>
      )
    }
  </li>
)

export default Tab
