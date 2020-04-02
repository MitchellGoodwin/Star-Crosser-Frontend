import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import LoginForm from './Auth/LoginForm';
import Welcome from './components/Welcome'
import SignUp from './Auth/SignUp'
import Header from './containers/Header';

class App extends React.Component {


  handleLogout = () => {
    localStorage.clear()
  }

  render() {
      return (
        <Router>
          <Header/>

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
        </Router>
      )
  }
}

export default App;
