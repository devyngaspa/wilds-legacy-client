const players_show = (params) => {
  let user_id = params.user_id;
  return fetch(`/players/load?user_id=${user_id}`)
}

export default players_show
