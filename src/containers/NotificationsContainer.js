import React from 'react'
import { connect } from 'react-redux';
import { Table, Image } from 'semantic-ui-react'

class NotificationsContainer extends React.Component {

    messageType = (notif) => {
        return (notif.action === 'Like' ? 'New like' : notif.action === 'Match' ? 'New Match' : `New Message From ${notif.user.firstName}`)
    }

    messageContent = (notif) => {
        return (notif.action === 'Like' ? `${notif.user.firstName} liked you!` : 
        notif.action === 'Match' ? `You've matched with ${notif.user.firstName}!` : 
        notif.text)
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
                        <Table.Row>
                            <Table.Cell>
                                <Image src={notif.user.image_url} rounded size='mini' />
                            </Table.Cell>
                            <Table.Cell>
                                {this.messageType(notif)}
                            </Table.Cell>
                            <Table.Cell>
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

export default connect(mapStateToProps)(NotificationsContainer)