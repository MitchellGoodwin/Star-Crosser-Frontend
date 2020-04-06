import React from 'react'

const URL = 'http://localhost:3000'

class InboxRight extends React.Component{

    state = {
        messages: [],
        text: '',
        loading: true
    }

    componentDidMount = () => {
        if (this.props.selected_user.length > 0) {
            fetch(URL + '/messages/' + this.props.selected_user.id,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('auth_token')
                }
                })
            .then(resp => resp.json())
            .then(messages => {
                this.setState({messages: messages, loading: false})
            })
        }
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default InboxRight