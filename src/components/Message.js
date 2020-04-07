import React from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'

class Message extends React.Component{

    render() {
        const { message, selected_user } = this.props
        const received = message.receiver.id === selected_user.id ? false : true
        return(
            <div className='message'>
            <Card className={received ? 'messageReceived' : 'messageSent'} >
                <Card raised className='messageout'>
                    <Card.Content className='messagein'>
                    <Image
                        avatar
                        floated={received ? 'left' : 'right'}
                        size='small'
                        src={!received ? this.props.currentUser.picture : selected_user.picture}
                    />
                    <Card.Description >{message.text}</Card.Description>
                    </Card.Content>
            </Card>
            </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(Message)