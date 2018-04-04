import React from 'react'

class ActionMenuAction extends React.Component {

  constructor(props) {
    super(props)
    this.handle_click = this.handle_click.bind(this)
  }

  handle_click() {

    // const id ='5a9c57695261785518c46578'
    // const room = 'encounter_' + id

    // global.socket.emit('encounter.state.perform', { id, room, performable: this.props.performable })
    this.props.on_click(this.props.performable)
  }

  render() {
    return (
      <td onClick={this.handle_click}>
        <span>{this.props.performable.type.toUpperCase()}</span>
        <br/>
        <b>{this.props.performable.name}</b>
      </td>
    )
  }

}

export default ActionMenuAction
