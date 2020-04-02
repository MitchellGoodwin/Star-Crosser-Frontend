import React from 'react'
import { Header, Segment, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const RenderLoggedIn = () => {
    return (
        <Button>
            SideBar
        </Button>
    )
}

const RenderLoggedOut = () => {
    return (
        <Menu>

            <Menu.Item
            name='login'
            >
                <Link to='/login'>
                    Login
                </Link>
            </Menu.Item>

            <Menu.Item
            name='signup'
            >
                <Link to='/signup'>
                    Signup
                </Link>
            </Menu.Item>
        </Menu>
    )
}

const SiteHeader = () => (
    <Segment clearing inverted>
        <Header as='h1' floated='left'>
            StarCrosser
        </Header>
        <Header floated='right'>
            {localStorage.getItem('auth_token') ?
                RenderLoggedIn()
                : RenderLoggedOut()}
        </Header>
    </Segment>
)

export default SiteHeader