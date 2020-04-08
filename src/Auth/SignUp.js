import React, { Component } from 'react';
import { Button, Form, Segment, Dropdown } from 'semantic-ui-react'

import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { getUsersPub } from '../actions/authActions'

const URL = 'http://localhost:3000'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        city: '',
        state: '',
        country: '',
        lookingFor: 'either',
    }

    handleInput = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(URL + '/users',{
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
                this.props.dispatch({ type: 'AUTH_SUCCESS', user: data.user})
                this.props.getUsersPub()
                this.props.history.push('/')
            }
        })
        
    }

    handleGenderChange = (e, data) => {
        this.setState({
            [data.name]: data.value
            })
    }

    render(){
        return (
        <span className='form-tag'>
            <h2> SignUp </h2>
            <Form onSubmit={this.handleSubmit}>
                <Segment inverted raised size='large'>
                    <Form.Field>
                        <label>Email</label>
                        <input type="text" 
                            name='email' 
                                placeholder="Email" 
                                    onChange={this.handleInput} 
                                        value={this.state.email} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" 
                            name='password' 
                                placeholder="password" 
                                    onChange={this.handleInput} 
                                        value={this.state.password} />
                    </Form.Field>

                    <Form.Field>
                        <label>First Name</label>
                        <input type="text" 
                            name='firstName' 
                                placeholder="First Name" 
                                    onChange={this.handleInput} 
                                        value={this.state.firstName} />
                    </Form.Field>

                    <Form.Field>
                        <label>Last Name</label>
                        <input type="text" 
                            name='lastName' 
                                placeholder="Last Name" 
                                    onChange={this.handleInput} 
                                        value={this.state.lastName} />
                    </Form.Field>

                    <Form.Field>
                        <label>Select Gender</label>
                        <Dropdown
                            onChange={this.handleGenderChange}
                            placeholder='Select Gender'
                            fluid
                            selection
                            value={this.state.gender}
                            name='gender'
                            options={[
                                {key: 'male',
                                text: 'male',
                                value: 'male',
                            },
                                {key: 'female',
                                text: 'female',
                                value: 'female',}
                            ]}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>I am looking for a ?</label>
                        <Dropdown
                            onChange={this.handleGenderChange}
                            placeholder='Select Gender'
                            fluid
                            selection
                            value={this.state.lookingFor}
                            name='lookingFor'
                            options={[
                                {key: 'male',
                                text: 'male',
                                value: 'male'},
                                {key: 'female',
                                text: 'female',
                                value: 'female'},
                                {key: 'either',
                                text: 'either',
                                value: 'either'}
                            ]}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Select your birth date</label>
                        <input type="date" 
                            name='birthDate' 
                                    onChange={this.handleInput} 
                                        value={this.state.birthDate} />
                    </Form.Field>

                    <Form.Field>
                        <label>Current City</label>
                        <input type="text" 
                            name='city' 
                                placeholder="City" 
                                    onChange={this.handleInput} 
                                        value={this.state.city} />
                    </Form.Field>

                    <Form.Field>
                        <label>Current State</label>
                        <input type="text" 
                            name='state' 
                                placeholder="State" 
                                    onChange={this.handleInput} 
                                        value={this.state.state} />
                    </Form.Field>

                    <Form.Field>
                        <label>Current Country</label>
                        <input type="text" 
                            name='country' 
                                placeholder="Country" 
                                    onChange={this.handleInput} 
                                        value={this.state.country} />
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

export default connect(null, mapDispatchToProps)(withRouter(SignUp));