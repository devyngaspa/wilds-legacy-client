import React from 'react'
import ActionMenuAction from '../encounter/action_menu/action'
import TargetMenu from '../encounter/target_menu'

class ActionMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {selected_performable: null, show_target_menu: false}
    this.handle_click = this.handle_click.bind(this)
  }

  handle_click(performable) {
    this.setState({selected_performable: performable})
    this.setState({show_target_menu: (!!performable && !!performable.target_type)})
  }

  render() {
    return (
      <div>
        <h4> AVAILABLE ACTIONS: </h4>
        <table>
          <tbody>
            <tr>
              <div>
                {
                  this.props.load.performables.map(performable => (
                    <ActionMenuAction key={performable.value._id} performable={performable} on_click={this.handle_click}/>
                ))}
              </div>
              <div>
                {this.state.show_target_menu && (
                  <TargetMenu load={this.props.load} performable={this.state.selected_performable} />
                )}
              </div>

            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}


export default ActionMenu
