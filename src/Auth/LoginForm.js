
import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'

import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { getUsersPub } from '../actions/authActions'

const URL = 'http://localhost:3000'

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }
    
    handleInput = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(URL + '/login',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: this.state })
        })
        .then(res => res.json())
        .then(data => {
            if (data.jwt !== 'undefined') {
                localStorage.setItem('auth_token',data.jwt)
            }
            this.props.dispatch({ type: 'AUTH_SUCCESS', user: data.user})
            this.props.getUsersPub()
            this.props.history.push('/')
        })
    }

    render(){
        return (
        <span className='form-tag'>
            <h2> Login </h2>
            <Form onSubmit={this.handleSubmit}>
                <Segment inverted raised size='large'>
                    <Form.Field>
                        <input type="text" 
                            name='email' 
                                placeholder="Email" 
                                    onChange={this.handleInput}  
                                        value={this.state.email} />
                    </Form.Field>
                    <Form.Field>
                        <input type="password" 
                            name='password' 
                                placeholder="password" 
                                    onChange={this.handleInput} 
                                        value={this.state.password} />
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Segment>
            </Form>
        </span>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersPub: () => dispatch(getUsersPub()),
        dispatch: dispatch
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));
