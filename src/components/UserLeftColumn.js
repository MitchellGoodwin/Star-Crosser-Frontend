import React from 'react'
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react'

class UserLeftColumn extends React.Component{

    render(){
        return(
            <Image src={this.props.user.picture}/>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
  }

export default connect(mapStateToProps)(UserLeftColumn)