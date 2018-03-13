import React from 'react'

class TargetMenuTarget extends React.Component {

  constructor(props) {
    super(props)
    this.handle_click = this.handle_click.bind(this)
  }

  handle_click() {
    this.props.on_click(this.props.targetable)
  }

  render() {
    return (
      <td onClick={this.handle_click}>
        <b>{this.props.targetable.name}</b>
      </td>
    )
  }

}

export default TargetMenuTarget
