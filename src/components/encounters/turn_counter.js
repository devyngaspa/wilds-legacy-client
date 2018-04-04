import React from 'react'
import TurnCounterActor from '../encounters/turn_counter/actor'

const TurnCounter = ({ load }) => (
  <div>
    <table style={{border: '1px solid black'}}>
      <thead>
        <th> TURNS: </th>
      </thead>
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
