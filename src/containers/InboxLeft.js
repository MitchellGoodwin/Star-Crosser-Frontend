import React from 'react'
import { Button } from 'semantic-ui-react'
import InboxUserCard from '../components/InboxUserCard'

class InboxLeft extends React.Component{

    state = {
        toggle: 'likes'
    }

    handleToggle = () => {
        this.setState({toggle: (this.state.toggle === 'likes' ? 'matches' : 'likes')})
    }


    render(){

        const users = () => {
            return (
                this.state.toggle === 'likes' ?
                this.props.liked_users :
                this.props.matched_users
            )
        }

        return(
            <div>
                <Button.Group fluid>
                    <Button 
                        color={this.state.toggle === 'likes'? 'green' : 'red'}
                            onClick={this.handleToggle}>
                        Likes</Button>
                    <Button 
                        color={this.state.toggle === 'matches'? 'green' : 'red'}
                            onClick={this.handleToggle}>
                        Matches</Button>
                </Button.Group>
                {users().map(user => <InboxUserCard user={user} handleSelect={this.props.handleSelect}/>)}
            </div>
        )
    }
}

export default InboxLeft