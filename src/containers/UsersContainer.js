import React from 'react'
import { Card } from 'semantic-ui-react'
import UserCard from '../components/UserCard'


const URL = 'http://localhost:3000'

class UsersContainer extends React.Component{

    state = {
        users: []
    }

    componentDidMount = () => {
        fetch(URL + '/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(users => {
            this.setState({users: users})
        })
    }

    render() {
        return(
            <Card.Group itemsPerRow='2'>
                {this.state.users.map(user => {return <UserCard user={user} />})}
            </Card.Group>
        )
    }
}

export default UsersContainer
