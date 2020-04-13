import React from 'react'
import { Header, Segment, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Footer = (props) => {

    const RenderLoggedIn = () => {

        const numNotif = props.notifications.length > 0 ? `${props.notifications.length} Notification${props.notifications.length > 1 ? 's': ''}  ` : null

        return (
            <Dropdown floating labeled direction='left' icon='bell' button text={numNotif}>
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
                        return <Link to={'profile/' + notification.user.id}><Dropdown.Item key={notification.id} text={message} image={{ avatar: true, src: notification.user.picture }}/></Link>
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
    return { user: state.auth.user, notifications: state.notifications.notifications }
}

export default connect(mapStateToProps)(Footer)