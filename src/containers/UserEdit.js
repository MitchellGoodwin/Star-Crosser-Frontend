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
                    <UserLeftColumn/>
                </Grid.Column>

                <Grid.Column width={9}>
                    <UserEditForm/>
                </Grid.Column>
            </Grid>

        )
    }

}

export default connect()(UserEdit)