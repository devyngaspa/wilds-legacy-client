import React from 'react'
import TurnCounterActor from '../encounter/turn_counter/actor'

const TurnCounter = ({ load }) => (
  <div>
    <table>
      <tbody>
        <tr>
          {
            load.actors.map(actor => (
              <TurnCounterActor key={actor._id} actor={actor} current={load.current_actor}/>
          ))}
        </tr>
      </tbody>
    </table>
  </div>



)

export default TurnCounter
