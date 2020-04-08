import React from 'react'
import { Header, Segment, Menu, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



const SiteHeader = (props) => {

    const RenderLoggedIn = (props) => {
        return (
            <Button onClick={() => props.dispatch({type: 'TOGGLE_SIDEBAR'})}>
                <Icon name='bars'/>
            </Button>
        )
    }
    
    const RenderLoggedOut = () => {
        return (
            <Menu>
    
                <Link to='/login'>
                    <Menu.Item
                    name='login'
                    >
                            Login
                    </Menu.Item>
                </Link>
    
                <Link to='/signup'>
                    <Menu.Item
                    name='signup'
                    >
                            Signup
                    </Menu.Item>
                </Link>
            </Menu>
        )
    }

    const HeaderColor = () => {
        return props.user.sun_sign ? 
        props.user.sun_sign.element === 'Fire' ? 'red' 
        : props.user.sun_sign.element === 'Water' ? 'blue'
        : props.user.sun_sign.element === 'Earth' ? 'yellow'
        : props.user.sun_sign.element === 'Air' ? 'green'
        : 'black'
        : 'black'
    }


    return (
    <Segment clearing inverted className='header' color={HeaderColor()}>
        <Header as='h1' floated='left'>
            StarCrosser
        </Header>
        <Header floated='right'>
            {props.user.id ?
                RenderLoggedIn(props)
                : RenderLoggedOut()}
        </Header>
    </Segment>
    )
}

const mapStateToProps = state => {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(SiteHeader)