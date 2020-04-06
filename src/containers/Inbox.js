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
        selected_user: []
    }

    handleSelect = (user) => {
        this.setState({selected_user: user})
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
                    <InboxRight selected_user={this.state.selected_user}/>
                <Grid.Column width='10'>

                </Grid.Column>
            </Grid>
        )

    }
}

const mapStateToProps = state => {
    return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(Inbox)