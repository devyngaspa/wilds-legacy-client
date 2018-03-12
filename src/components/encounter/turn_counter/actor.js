import React from 'react'

const TurnCounterActor = ({ actor, current }) => {
  const is_current = () => {
    return (actor._id === current._id);
  };

  return (
    <td current={is_current() ? 'true' : undefined}>
      {is_current() ? (<b>{actor.name}</b>) : (<div>{actor.name}</div>)}
    </td>
  )



}

export default TurnCounterActor
