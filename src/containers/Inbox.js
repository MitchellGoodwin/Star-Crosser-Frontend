import React from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InboxLeft from './InboxLeft'
import InboxRight from './InboxRight'

const URL = 'http://localhost:3000'

class Inbox extends React.Component{

    state = {
        liked_users: [],
        matched_users: [],
        selected_user: [],
        messages: [],
        canMessage: false,
        text: ''
    }

    handleSelect = (user) => {
        fetch(URL + '/messages/' + user.id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(messages => {
            let messStatus
            (this.state.matched_users.filter(m => parseInt(m.id) === parseInt(user.id)).length === 1) || (messages.filter(message => parseInt(message.receiver.id) === parseInt(user.id) ).length === 0) ?
            messStatus = true : messStatus = false
            return this.setState({messages: messages, selected_user: user, canMessage: messStatus})
        })
    }

    handleChange = (e) => {
        this.setState({text: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(URL + '/messages',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({ text: this.state.text, receiver_id: this.state.selected_user.id })
        }).then(resp => resp.json())
        .then(message => {
            let messStatus
            this.state.matched_users.filter(m => parseInt(m.id) === (parseInt(this.state.selected_user.id))).length === 1 ?
                messStatus = true :
                messStatus = false
            
            this.setState({
            messages: [...this.state.messages, message],
            text: '',
            canMessage: messStatus
        })
    }
        )
    }

    componentDidMount = () => {
        fetch(URL + '/likes',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(data => {
            this.setState({liked_users: data.liked_users, matched_users: data.matched_users})
        })
    }


    render() {
        return(
            <Grid className='inbox'>
                <Grid.Column width='4'>
                    <InboxLeft liked_users={this.state.liked_users} matched_users={this.state.matched_users} handleSelect={this.handleSelect}/>
                </Grid.Column>
                <Grid.Column width='10'>
                    <InboxRight canMessage={this.state.canMessage} handleChange={this.handleChange} handleSubmit={this.handleSubmit} text={this.state.text} messages={this.state.messages} selected_user={this.state.selected_user}/>

                </Grid.Column>
            </Grid>
        )

    }
}

const mapStateToProps = state => {
    return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(Inbox)