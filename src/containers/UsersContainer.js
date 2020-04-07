import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import UserCard from '../components/UserCard'


const URL = 'http://localhost:3000'

class UsersContainer extends React.Component{

    state = {
        users: [],
        allusers: [],
        compatability: false,
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
            this.setState({users: users, allusers: users})
        })
    }

    handleClick = () => {
        !this.state.compatability ? 
        fetch(URL + '/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token'),
                'Filter': 'Compatability'
            }
            })
        .then(resp => resp.json())
        .then(users => {
            this.setState({users: users, compatability: true})
        })
        : this.setState({users: this.state.allusers, compatability: false})
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.handleClick()}>
                    {this.state.compatability ? 'Show everybody' : 'Show by my sign compatability'}
                </Button>
                <br/> <br/>
                <Card.Group itemsPerRow='2'>
                    {this.state.users.map(user => {return <UserCard user={user} />})}
                </Card.Group>
            </div>
        )
    }
}

export default UsersContainer
