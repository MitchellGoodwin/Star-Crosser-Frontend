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
            this.setState({messages: messages, selected_user: user})
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
        .then(message => this.setState({
            messages: [...this.state.messages, message],
            text: ''
        }))
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
            <Grid>
                <Grid.Column width='4'>
                    <InboxLeft liked_users={this.state.liked_users} matched_users={this.state.matched_users} handleSelect={this.handleSelect}/>
                </Grid.Column>
                <Grid.Column width='10'>
                    <InboxRight handleChange={this.handleChange} handleSubmit={this.handleSubmit} text={this.state.text} messages={this.state.messages} selected_user={this.state.selected_user}/>

                </Grid.Column>
            </Grid>
        )

    }
}

const mapStateToProps = state => {
    return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(Inbox)