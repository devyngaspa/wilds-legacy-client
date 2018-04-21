import object from './object'
import time from './time'

export default {
  object: object,
  time:   time,

  get_cookie_value: (name) => {
    let cookies = document.cookie.split('; ')
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let kv = cookie.split('=')
      let key = kv[0]; let value = kv[1]
      if (key === name) { return value }
    }
    return undefined
  },

  get_query_params: (location) => {
    let qp = location.search
    let obj = {}
    if (!qp) { return obj }
    qp = qp.slice(1).split('&')
    for(let i=0; i<qp.length; i++) {
      let kv    = qp[i].split('=')
      let key   = kv[0]
      let value = kv[1]
      obj[key]  = value
    }
    return obj
  }
}
