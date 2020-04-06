import React from 'react'
import SignInfo from '../components/SignInfo'
import { Loader } from 'semantic-ui-react'


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
            <div>
                {this.state.sign.id ?
                <SignInfo sunSign={this.state.sign} /> 
                : <Loader active='true' size='massive'></Loader>}
            </div>
        )
    }
}

export default Sign