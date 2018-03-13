const encounter_load = (id) => {
  return fetch(`/encounters/${id}/load`)
}

export default encounter_load
