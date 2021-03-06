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
import Footer from './containers/Footer'
import CheckLogin from './Auth/CheckLogin';

import { Menu, Icon, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import UserEdit from './containers/UserEdit';
import User from './containers/User'
import SignInfo from './components/SignInfo';
import Sign from './containers/Sign';
import UsersContainer from './containers/UsersContainer';
import Inbox from './containers/Inbox';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';

import { checkUser } from './actions/authActions'
import NotificationsContainer from './containers/NotificationsContainer';


const API_WS_ROOT = 'ws://localhost:3000/cable';

class App extends React.Component {

  state = {
    welcome: false
  }

  toggleWelcome = () => {
    this.setState({welcome: !this.state.welcome})
  }


  handleLogout = () => {
    localStorage.clear()
    this.props.dispatch({ type: 'LOG_OUT'})
    this.props.dispatch({type: 'TOGGLE_SIDEBAR'})
  }

  componentDidMount = () => {
    if (localStorage.getItem('auth_token')) {
      this.props.checkUser()
    }
  }

  handleReceived = (resp) => {
    console.log(resp)
    if (resp.notification.action === 'Message'){
      if (parseInt(resp.notification.user.id) === parseInt(this.props.selectedUser.id)) {
        let messStatus = this.props.canMessage
        let message = {text: resp.notification.text, receiver: this.props.user}
        this.props.dispatch({ type: 'ADD_MESSAGE', message: message, canMessage: messStatus})

      }
    }
    if (resp.notification) {
      this.props.dispatch({type: 'ADD_NOTIFICATION', notification: resp.notification})
    }
  }



  render() {
      return (
        <Router>
          <ActionCableProvider url={API_WS_ROOT}>
          <ActionCableConsumer
        channel={{
          channel: "NotificationsChannel",
          user: this.props.user.id
      }} onReceived={this.handleReceived}
      >
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
            className='sidebar'
          >
              <Link to='/'>
                <Menu.Item >
                  <Icon name='home' />
                  Home
                </Menu.Item>
              </Link>

            <Link to='/my-profile'>
              <Menu.Item>
                <Icon name='user' />
                Profile
              </Menu.Item>
            </Link>

            <Link to='/explore'>
              <Menu.Item>
                <Icon name='binoculars' />
                Explore
              </Menu.Item>
            </Link>

            <Link to='/my-sign'>
              <Menu.Item>
                <Icon name='sun' />
                My Sun Sign
              </Menu.Item>
            </Link>

            <Link to='/inbox'>
              <Menu.Item>
                <Icon name='mail' />
                Inbox
              </Menu.Item>
            </Link>

            <Link to='/notifications'>
              <Menu.Item>
                <Icon name='list' />
                All Notifications
              </Menu.Item>
            </Link>

            <Link to='/logout'>
              <Menu.Item>
                <Icon name='sign-out' />
                Log Out
              </Menu.Item>
            </Link>
          

            </Sidebar>

            <Sidebar.Pusher dimmed={this.props.sideBar} onClick={this.props.sideBar ? () => this.props.dispatch({type: 'TOGGLE_SIDEBAR'}) : null}>
              <div className={this.state.welcome ? 'welcome-background' : 'background'}>
                  <div className='body-app' >
                <Switch>
                  <Route exact path='/' component={() => {
                      return <Welcome welcome={this.state.welcome} toggleWelcome={this.toggleWelcome}/>
                      }} />

                  <Route exact path='/login' component={() => {
                        return <LoginForm />
                      }} />
                  
                  <Route exact path='/signup' component={() => {
                      return <SignUp />
                      }} />

                  <Route exact path='/my-profile' component={() => {
                      return <CheckLogin component={UserEdit} />
                      }} />

                  <Route exact path='/explore' component={() => {
                      return <CheckLogin component={UsersContainer} />
                      }} />

                  <Route exact path='/my-sign' component={() => {
                      return <CheckLogin component={() => {
                      return <SignInfo sunSign={this.props.sunSign}/>}} />
                  }}/>

                  <Route exact path='/inbox' component={() => {
                      return <CheckLogin component={Inbox} />
                      }} />

                  <Route exact path='/notifications' component={() => {
                      return <CheckLogin component={NotificationsContainer} />
                      }} />

                  <Route exact path='/logout' component={() => {
                      this.handleLogout()
                      return <Redirect to='/' />
                    }} />

                  <Route path='/profile/:id' render={routerProps => <User {...routerProps}/>}/>

                  <Route path='/sign/:id' render={routerProps => <Sign {...routerProps}/>}/>

                  <Route>
                    <Redirect to='/' />
                  </Route>
                </Switch>
                  </div>
                </div>
          </Sidebar.Pusher>
          </Sidebar.Pushable>
          <Footer/>
          </ActionCableConsumer>
          </ActionCableProvider>
        </Router>
      )
  }
}

const mapStateToProps = state => {
  return { sideBar: state.sideBar.sideBar, sunSign: state.auth.user.sun_sign, user: state.auth.user, canMessage: state.inbox.canMessage, selectedUser: state.inbox.selectedUser }
}

function mapDispatchToProps(dispatch){
  return { checkUser: () => dispatch(checkUser()), dispatch: dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
