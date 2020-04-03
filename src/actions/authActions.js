const URL = 'http://localhost:3000'

export function loginUser(user) {
    debugger
    return (dispatch) => {
        dispatch({ type: 'ATTEMPT_AUTH'})
        fetch(URL + '/login',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.jwt !== 'undefined') {
                localStorage.setItem('auth_token',data.jwt)
            }
            this.props.dispatch({ type: 'AUTH_SUCCESS', user: data.user})
        })
    }
}

export const signUpUser = (user) => {
    return (dispatch) => {
        dispatch({ type: 'ATTEMPT_AUTH'})
        fetch(URL + '/users',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('auth_token',data.jwt)
            dispatch({ type: 'AUTH_SUCCESS', user: data.user})
            this.props.history.push('/')
        })
    }
}