import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import UserLeftColumn from '../components/UserLeftColumn';
import UserShowInfo from '../components/UserShowInfo';

const URL = 'http://localhost:3000'

class User extends React.Component{

    state = {
        user: {},
        loading: true,
        likes: [],
        matches: []
    }

    componentDidMount = () => {

        setTimeout(() => {
            if (parseInt(this.props.match.params.id) === parseInt(this.props.currentUser.id)) {
                this.setState({user: this.props.currentUser, loading: false})
            } else {
                fetch(URL + '/users/' + this.props.match.params.id,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('auth_token')
                    }
                    })
                .then(resp => resp.json())
                .then(data => {
                    this.setState({user: data.user, likes: data.likes, matches: data.matches, loading: false})
                })
            }

        }, 500)
    }

    handleLikeClick = () => {
        fetch(URL + '/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }, 
            body: JSON.stringify({ likee_id: this.state.user.id})
            })
        .then(resp => resp.json())
        .then(data => {
            this.setState({likes: data.like, matches: data.match})
        })
    }

    handleUnlikeClick = () => {
        fetch(URL + '/likes/' + this.state.likes[0].id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(like => {
            this.setState({likes: []})
        })
    }

    handleUnmatchClick = () => {
        fetch(URL + '/matches/' + this.state.matches[0].id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth_token')
            }
            })
        .then(resp => resp.json())
        .then(match => {
            this.setState({matches: []})
        })
    }

    render(){
        return(
            <Grid >
                <Grid.Column width={4}>
                    <UserLeftColumn user={this.state.user} handleLikeClick={this.handleLikeClick} handleUnlikeClick={this.handleUnlikeClick} handleUnmatchClick={this.handleUnmatchClick} likes={this.state.likes} matches={this.state.matches} sun_sign={this.state.user.sun_sign}/>
                </Grid.Column>

                <Grid.Column width={9}>
                    <UserShowInfo user={this.state.user} loading={this.state.loading}>
                    </UserShowInfo>

                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(User)