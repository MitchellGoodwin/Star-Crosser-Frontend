import React from 'react'
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import UserLeftColumn from '../components/UserLeftColumn';
import UserEditForm from '../components/UserEditForm';

class UserEdit extends React.Component{

    render(){
        return(
            <Grid >
                <Grid.Column width={4}>
                    <UserLeftColumn user={this.props.user} sun_sign={this.props.sun_sign}/>
                </Grid.Column>

                <Grid.Column width={9}>
                    <UserEditForm/>
                </Grid.Column>
            </Grid>

        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        sun_sign: state.auth.user.sun_sign
    }
}

export default connect(mapStateToProps)(UserEdit)