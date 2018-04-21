export default function authenticate_user(user) {

  return (dispatch) => {
    dispatch({
      type: 'USER_SET_ID',
      payload: user
    })
    return dispatch({
      type: 'USER_AUTHENTICATE',
      payload: true
    })
  }

}
