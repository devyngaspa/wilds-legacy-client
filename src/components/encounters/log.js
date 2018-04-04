import React from 'react'

const EncounterLog = ({ load }) => (
  <div>
    <h3> Encounter Log </h3>
    <ul>
      {
        load.encounter.log.map(line => (
          <li>{line}</li>
      ))}
    </ul>
  </div>
)

export default EncounterLog
