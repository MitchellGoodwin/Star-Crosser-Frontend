import React from 'react'
import { Header, Segment, Dropdown} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const URL = 'http://localhost:3000'

const Footer = (props) => {


    const handleOpen = () => {
        fetch(URL + '/readall',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(data => props.dispatch({ type: 'READ_NOTIFICATIONS'}))
    }

    const handleSelect = (user, action) => {
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
            props.dispatch({ type: 'SET_INBOX_USER', user: user, messages: messages, canMessage: false})
            props.history.push('/inbox')
        })) : 
        props.history.push('/profile/' + user.id)
    }

    const RenderLoggedIn = () => {

        const numNotif = !props.read ? `${props.notifications.length} Notification${props.notifications.length > 1 ? 's': ''}  ` : null

        return (
            <Dropdown onOpen={() => handleOpen()} floating labeled upward direction='left' icon='bell' button text={numNotif}>
                <Dropdown.Menu className='notif-menu'>
                    <Dropdown.Header>Notifications: </Dropdown.Header>
                    {props.notifications.map(notification => {
                        let message
                        message = (notification.action === 'Message' ? 
                        `You have received a new message from ${notification.user.firstName}` :
                        notification.action === 'Like' ? 
                        `${notification.user.firstName} liked you!` :
                        notification.action === 'Match' ? 
                        `You've matched with ${notification.user.firstName}!` :
                        null)
                        return <Dropdown.Item onClick={() => handleSelect(notification.user, notification.action)} className='notif-menu-item' key={notification.id} text={message} image={{ avatar: true, src: notification.user.image_url }}/>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    
    const RenderLoggedOut = () => {
        return (
            <div></div>
        )
    }

    const FooterColor = () => {
        return props.user.sun_sign ? 
        props.user.sun_sign.element === 'Fire' ? 'red' 
        : props.user.sun_sign.element === 'Water' ? 'blue'
        : props.user.sun_sign.element === 'Earth' ? 'yellow'
        : props.user.sun_sign.element === 'Air' ? 'green'
        : 'black'
        : 'black'
    }


    return (
    <Segment clearing inverted className='footer' color={FooterColor()}>
        <Header floated='right'>
            {props.user.id ?
                RenderLoggedIn(props)
                : RenderLoggedOut()}
        </Header>
    </Segment>
    )
}

const mapStateToProps = state => {
    return { user: state.auth.user, notifications: state.notifications.notifications, read: state.notifications.read }
}

export default connect(mapStateToProps)(withRouter(Footer))