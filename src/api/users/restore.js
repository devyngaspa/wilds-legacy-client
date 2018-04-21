import whelp from '../../helpers/base'

const users_restore = () => {
  let data = {
    user_id:    whelp.get_cookie_value('user_id'),
    session_id: whelp.get_cookie_value('session_id')
  }
  return fetch(`/users/restore`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
}

export default users_restore
