import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserCard extends React.Component {

    
    render() {
        const { user } = this.props
        const element = user.element
        return(
            <Card raised style={{width: '45%'}}>
                <Link to={'profile/' + user.id} style={{ textDecoration: 'none' }} className={element+ 'Card'}>
                    <Card.Content >
                    <Image
                    
                        floated='left'
                        size='small'
                        src={user.image_url}
                    />
                    <Image
                    
                        floated='right'
                        style={{height: '150px'}}
                        src={user.sun_sign_image}
                    />
                    <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                    <Card.Meta>{user.age}</Card.Meta>
                    <Card.Meta>{user.sun_sign_name}</Card.Meta>
                    <Card.Description>
                        {user.location}
                    </Card.Description>
                    </Card.Content>
                </Link>
            </Card>
        )

    }
}

export default UserCard