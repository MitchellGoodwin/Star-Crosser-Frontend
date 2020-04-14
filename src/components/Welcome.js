import React from 'react'

import { connect } from 'react-redux';

class Welcome extends React.Component{


    render() {
        return(
            <div className='welcome-text'>
                {/* Welcome {this.props.user.firstName ? this.props.user.firstName : 'Please Log In or Sign Up!'} */}
                <h1>Welcome to StarCrosser</h1>
                <p>The premier dating app for finding your match with the help of the ancient science of Astrology!</p>
            </div>
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