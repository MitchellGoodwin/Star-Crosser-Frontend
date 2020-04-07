import React from 'react'

import { connect } from 'react-redux';

class Welcome extends React.Component{


    render() {
        return(
            <div>Welcome {this.props.user.firstName ? this.props.user.firstName : 'Please Log In or Sign Up!'}</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        sidebar: state.sideBar.sideBar
    }
}

export default connect(mapStateToProps)(Welcome)