import React from 'react'
import { connect } from 'react-redux'

import { Button, Form, Segment, TextArea } from 'semantic-ui-react'

const URL = 'http://localhost:3000'

class UserEditForm extends React.Component{

    handleInput = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
        this.props.dispatch({
            type: 'HANDLE_CHANGE',
            name: e.target.name,
            value: e.target.value
        })
    }

    componentDidUpdate = () => {
        if (!this.props.initialValues && this.props.oldUser.id) {
            const user = {...this.props.oldUser}
            user.city = user.location.split(', ')[0]
            user.state = user.location.split(', ')[1]
            user.country = user.location.split(', ')[2]
            this.props.dispatch({type: 'SET_USER', user: user})
        }
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'RESET_FORM'})
    }

    handleSubmit = (e) => {
        const user = {...this.props.user}
        user.location = user.city + ', ' + user.state + ', ' + user.country
        e.preventDefault()
        fetch(URL + '/users/' + this.props.oldUser.id,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({ user: user })
        })
        .then(res => res.json())
        .then(data => {
            if (data.jwt !== 'undefined') {
                this.props.dispatch({ type: 'AUTH_SUCCESS', user: data.user})
            }
        })
        
    }


    render(){
        return(
            <div>
                <h1>Fill out your profile info:</h1> <Button>Preview Profile</Button>
                <Form onSubmit={this.handleSubmit}>
                <Segment inverted raised>

                    <Form.Field>
                        <label>Current City</label>
                        <input type="text" 
                            name='city' 
                                placeholder="City" 
                                    onChange={this.handleInput} 
                                        value={this.props.user.city} />
                    </Form.Field>

                    <Form.Field>
                        <label>Current State</label>
                        <input type="text" 
                            name='state' 
                                placeholder="State" 
                                    onChange={this.handleInput} 
                                        value={this.props.user.state} />
                    </Form.Field>

                    <Form.Field>
                        <label>Current Country</label>
                        <input type="text" 
                            name='country' 
                                placeholder="Country" 
                                    onChange={this.handleInput} 
                                        value={this.props.user.country} />
                    </Form.Field>

                    <Form.Field>
                        <label>Write an introduction for yourself:</label>
                        <TextArea type="textarea" 
                            name='bioIntro' 
                                placeholder="Introduce yourself!" 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioIntro} />
                    </Form.Field>

                    <Form.Field>
                        <label>What do you like to do? Any general weekend plans?</label>
                        <TextArea type="textarea" 
                            name='bioActivities' 
                                placeholder="My favorite activities are..." 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioActivities} />
                    </Form.Field>

                    <Form.Field>
                        <label>What's your favorite music?</label>
                        <TextArea type="textarea" 
                            name='bioMusic' 
                                placeholder="The best jams are..." 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioMusic} />
                    </Form.Field>

                    <Form.Field>
                        <label>Any favorite movies?</label>
                        <TextArea type="textarea" 
                            name='bioMovies' 
                                placeholder="Favorite flick for when I'm sad/happy..." 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioMovies} />
                    </Form.Field>

                    <Form.Field>
                        <label>Favorite books/authors?</label>
                        <TextArea type="textarea" 
                            name='bioBooks' 
                                placeholder="My favorite series are..." 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioBooks} />
                    </Form.Field>

                    <Form.Field>
                        <label>What's your favorite food? Prefered date cuisine?</label>
                        <TextArea type="textarea" 
                            name='bioFood' 
                                placeholder="Enter in something messy if it's real..." 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioFood} />
                    </Form.Field>

                    <Form.Field>
                        <label>Is there anything you are working towards? Where do you see youself in a few years?</label>
                        <TextArea type="textarea" 
                            name='bioGoals' 
                                placeholder="My goals are..." 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioGoals} />
                    </Form.Field>

                    <Form.Field>
                        <label>Any thing else you'd like to say about yourself:</label>
                        <TextArea type="textarea" 
                            name='bioGeneral' 
                                placeholder="General things" 
                                    onChange={this.handleInput} 
                                        value={this.props.user.bioGeneral} />
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Segment>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.currentUser.user,
        oldUser: state.auth.user,
        initialValues: state.currentUser.initialUser
    }
  }


export default connect(mapStateToProps)(UserEditForm)