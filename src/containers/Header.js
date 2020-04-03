import React from 'react'
import { Header, Segment, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



const SiteHeader = (props) => {

    const RenderLoggedIn = (props) => {
        return (
            <Button onClick={() => props.dispatch({type: 'TOGGLE_SIDEBAR'})}>
                SideBar
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


    return (
    <Segment clearing inverted>
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