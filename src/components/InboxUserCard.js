import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class InboxUserCard extends React.Component {

    
    render() {
        const { user } = this.props
        return(
            <Card raised fluid onClick={() => this.props.handleSelect(user)}>
                    <Card.Content>
                    <Image
                        avatar
                        floated='left'
                        size='small'
                        src={user.picture}
                    />
                    <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                    <Card.Meta>{user.age}</Card.Meta>
                    </Card.Content>
            </Card>
        )

    }
}

export default InboxUserCard