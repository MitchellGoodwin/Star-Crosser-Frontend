const URL = 'http://localhost:3000'

export const getCompata = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_USERS' })
      dispatch({ type: 'TOGGLE_COMPATABILITY'})
      fetch(URL + '/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token'),
                'Filter': 'Compatability'
            }
            })
        .then(resp => resp.json())
        .then(users => dispatch({ type: 'SET_USERS', users }))
  }
}

export const resetCompata = () => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USERS' })
    dispatch({ type: 'TOGGLE_COMPATABILITY'})
    dispatch({ type: 'RESET_USERS'})
}
}

