import React from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'

class Message extends React.Component{

    render() {
        const { message, selected_user } = this.props
        return(
            <Card>
                <Card raised >
                    <Card.Content>
                    <Image
                        avatar
                        floated={message.receiver.id === selected_user.id ? 'right' : 'left'}
                        size='small'
                        src={message.receiver.id === selected_user.id ? this.props.currentUser.picture : selected_user.picture}
                    />
                    <Card.Description>{message.text}</Card.Description>
                    </Card.Content>
            </Card>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(Message)