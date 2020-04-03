import React from 'react'

import { connect } from 'react-redux';

class Welcome extends React.Component{
    render() {
        return(
            <div>Welcome {this.props.user.firstName ? this.props.user.firstName : null}</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
  }

export default connect(mapStateToProps)(Welcome)