import React from 'react'
import { connect } from 'react-redux';
import { Table, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const URL = 'http://localhost:3000'

class NotificationsContainer extends React.Component {

    messageType = (notif) => {
        return (notif.action === 'Like' ? 'New like' : notif.action === 'Match' ? 'New Match' : `New Message From ${notif.user.firstName}:`)
    }

    messageContent = (notif) => {
        return (notif.action === 'Like' ? `${notif.user.firstName} liked you!` : 
        notif.action === 'Match' ? `You've matched with ${notif.user.firstName}!` : 
        notif.text)
    }

    handleSelect = (user, action) => {
        console.log(action)
        action === 'Message' ?
        (fetch(URL + '/messages/' + user.id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(messages => {
            this.props.dispatch({ type: 'SET_INBOX_USER', user: user, messages: messages, canMessage: false})
            this.props.history.push('/inbox')
        })) : 
        this.props.history.push('/profile/' + user.id)
    }

    render(){
        return(
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>Notifications</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.notifications.map(notif => {
                        return(
                        <Table.Row >
                            <Table.Cell onClick={() => this.handleSelect(notif.user, notif.acction)}>
                                <Image src={notif.user.image_url} rounded size='mini' />
                            </Table.Cell>
                            <Table.Cell onClick={() => this.handleSelect(notif.user, notif.action)}>
                                {this.messageType(notif)}
                            </Table.Cell>
                            <Table.Cell onClick={() => this.handleSelect(notif.user, notif.action)}>
                                {this.messageContent(notif)}
                            </Table.Cell>
                        </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }

}

const mapStateToProps = state => {
    return { notifications: state.notifications.allNotifications, read: state.notifications.read }
}

export default connect(mapStateToProps)(withRouter(NotificationsContainer))