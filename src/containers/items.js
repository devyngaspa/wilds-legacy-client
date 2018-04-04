import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Items from '../components/items/main'

class ItemsContainer extends Component {

  render() {
    return (
      <div>
        <Items/>
      </div>
    );
  }
}

export default ItemsContainer;
