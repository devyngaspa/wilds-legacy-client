import React from 'react'

const TurnCounterActor = ({ actor, current }) => {
  const is_current = () => {
    return (actor._id === current._id);
  };

  return (
    <td style={{padding: '0px 20px'}} current={is_current() ? 'true' : undefined}>
      {is_current() ? (<b>{actor.name}<br/>HP: {actor.hp}</b>) : (<div>{actor.name}<br/>HP: {actor.hp}</div>)}
    </td>
  )



}

export default TurnCounterActor
