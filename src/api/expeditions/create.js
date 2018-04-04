const expeditions_create = (params) => {
  return fetch(`/expeditions/`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}

export default expeditions_create
