import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import UserLeftColumn from '../components/UserLeftColumn';
import UserShowInfo from '../components/UserShowInfo';

class User extends React.Component{

    state = {
        user: {},
        loading: true
    }

    componentDidMount = () => {

        setTimeout(() => {
            if (this.props.match.params.id == this.props.currentUser.id) {
                this.setState({user: this.props.currentUser, loading: false})
            }

        }, 500)
    }

    render(){
        return(
            <Grid >
                <Grid.Column width={4}>
                    <UserLeftColumn user={this.state.user} sun_sign={this.state.user.sun_sign}/>
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