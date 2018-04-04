import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'
import countdown from 'countdown'
import moment from 'moment'

class Expedition extends Component {
  state = { timespan: '' }

  get_countdown () {
    return countdown(new Date(this.props.expedition.end_time))
  }

  get_end_time_is_in_future () {
    let end_time = moment(this.props.expedition.end_time)
    let now      = moment()
    return end_time.isAfter(now)
  }

  set_timespan () {
    let timespan = ''
    if (this.get_end_time_is_in_future()) {
      timespan = this.get_countdown().toString()
    }
    this.setState({ timespan: timespan })
  }

  expedition_complete () {
    let id        = this.props.expedition._id
    let player_id = this.props.player._id
    let room      = this.props.player.room
    global.socket.emit('expedition.complete', { id, player_id, room });
  }
  
  componentDidMount() {
    this.set_timespan()
    if (!this.get_end_time_is_in_future()) { this.expedition_complete() }
    else {
      this.setState({ interval: setInterval( () => {
        if (!this.get_end_time_is_in_future()) { 
          this.expedition_complete()
          clearInterval(this.state.interval)
        }
        else { this.set_timespan() }
      }, 1000)})
    }
  }

  render() {
    return (
      <li>
        <Container>
          <Row>
            <Col>{this.props.expedition.quest.quest_tmpl.name}
            </Col>
            <Col>
              <ul>
                { this.props.expedition.characters.map((character) => (
                  <li key={character._id}>{character.name}</li>
                ))}
              </ul>
            </Col>
            <Col>
              <p>{this.state.timespan}</p>
            </Col>
          </Row>
        </Container>
      </li>
    )
  }
}

export default Expedition
