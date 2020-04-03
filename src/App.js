import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

import LoginForm from './Auth/LoginForm';
import Welcome from './components/Welcome'
import SignUp from './Auth/SignUp'
import Header from './containers/Header';
import { Menu, Icon, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'

const URL = 'http://localhost:3000'

class App extends React.Component {


  handleLogout = () => {
    localStorage.clear()
    this.props.dispatch({ type: 'LOG_OUT'})
    this.props.dispatch({type: 'TOGGLE_SIDEBAR'})
  }

  componentDidMount = () => {
    if (localStorage.getItem('auth_token')) {
      fetch(URL + `/current`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        }
        })
        .then(res => res.json())
        .then(data => {
          this.props.dispatch({ type: 'AUTH_SUCCESS', user: data.user})
        })
    }
  }



  render() {
      return (
        <Router>
          <Header/>
          <Sidebar.Pushable style={{height: '100vh'}}>

            <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={this.props.sideBar}
            width='thin'
            direction='right'
          >
              <Link to='/'>
                <Menu.Item as='a'>
                  <Icon name='home' />
                  Home
                </Menu.Item>
              </Link>

            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>

            <Link to='/logout'>
              <Menu.Item as='a'>
                <Icon name='sign-out' />
                Log Out
              </Menu.Item>
            </Link>
          

            </Sidebar>

            <Sidebar.Pusher>
          <Switch>

            <Route exact path='/' component={() => {
                return <Welcome />
                }} />

            <Route exact path='/login' component={() => {
                  return <LoginForm />
                }} />
            
            <Route exact path='/signup' component={() => {
                return <SignUp />
                }} />

            <Route exact path='/logout' component={() => {
                this.handleLogout()
                return <Redirect to='/' />
              }} />

            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
          </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Router>
      )
  }
}

const mapStateToProps = state => {
  return { sideBar: state.sideBar.sideBar }
}

export default connect(mapStateToProps)(App);
