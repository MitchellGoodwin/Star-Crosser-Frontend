import React from 'react'
import { Image } from 'semantic-ui-react'

import { connect } from 'react-redux';

class Welcome extends React.Component{

    componentDidMount = () => {
        if (!this.props.welcome) {
            this.props.toggleWelcome()
        }
    }

    componentWillUnmount = () => {
        if (this.props.welcome) {
            this.props.toggleWelcome()
        }
    }

    render() {
        return(
            <div className='welcome-text'>
                <div >
                    <h1>Welcome to StarCrosser</h1>
                    <p>The premier dating app for finding your match with the help of the ancient science of Astrology!</p>
                    <Image src="https://66.media.tumblr.com/5654154dba1ade64c67b682c5dee899b/cdf8fc99c7c5816d-aa/s500x750/c67670215fabdff021ddd526ac6477ecf5d08953.gif" fluid/>
                    <h2>The process:</h2>
                    <p>When you sign up you will input your birthday, and our team of space wizards will divinate your zodiac sign.</p>
                    <p>You can check My Sign to see information about what your sign says about you, as well as what your compatable signs are.</p>
                    <p>Check out explore to look for other users.</p>
                    <p>You can filter through users by age, distance, and, of course, sign compatability.</p>
                    <h2>Messaging Policy:</h2>
                    <p>Once you've found someone you're interested in you can like and then message them.</p>
                    <p>Just know this: you can only message someone once unless they like you back. So you better make that first message a good one!</p>
                    <h1>Now Good Luck Finding Love Among The Stars!</h1>
                    <Image src="https://66.media.tumblr.com/1504e8197104db630c1acb52dd8b8d89/tumblr_oln24vuJxT1txe8seo1_500.gif" fluid/>
                </div>
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