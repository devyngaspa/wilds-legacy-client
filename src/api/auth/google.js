import whelp from '../../helpers/base'

const auth_google = (from) => {
  let data = { from }
  return fetch(`localhost:3001/auth/google`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export default auth_google
