import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class UserCard extends React.Component {

    
    render() {
        const { user } = this.props
        return(
            <Card raised>
                <Card.Content>
                <Image
                    floated='left'
                    size='large'
                    src={user.picture}
                />
                <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                <Card.Meta>{user.age}</Card.Meta>
                <Card.Description>
                    {user.location}
                </Card.Description>
                </Card.Content>
            </Card>
        )

    }
}

export default UserCard