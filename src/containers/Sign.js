import React from 'react'
import SignInfo from '../components/SignInfo'


const URL = 'http://localhost:3000'

class Sign extends React.Component{

    state = {
        sign: {}
    }

    componentDidMount = () => {
        fetch(URL + '/sun_signs/' + this.props.match.params.id)
        .then(resp => resp.json())
        .then(sign => this.setState({sign: sign}))
    }
    
    render(){
        return(
            <SignInfo sunSign={this.state.sign} />
        )
    }
}

export default Sign