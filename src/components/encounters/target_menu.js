import React from 'react'
import TargetMenuTarget from '../encounters/target_menu/target'

class TargetMenu extends React.Component {

  constructor(props) {
    super(props)
    let party = props.load.parties.find((party) => { return party.allegiance === 'enemy' })
    this.handle_click = this.handle_click.bind(this)
    this.state = {targetables: props.load.actors.filter( (actor) => { return party.actor_ids.includes(actor._id)})}
  }

  handle_click(targetable) {
    let type   = this.props.performable.type
    let value  = this.props.performable
    let agent  = this.props.load.current_actor
    let target = targetable
    let id     = global.player.encounter_id
    let room   = global.room
    global.socket.emit('encounter.state.perform', { id, room, type, value, agent, target })
  }

  render() {
    return (
      <div>
        <h4> TARGETS: </h4>
        <table>
          <tbody>
            <tr>
              {
                this.state.targetables.map((targetable) => (
                  <TargetMenuTarget key={targetable._id} targetable={targetable} on_click={this.handle_click}/>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    )
  }

}

export default TargetMenu
