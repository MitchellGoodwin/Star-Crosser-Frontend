import React from 'react'
import { connect } from 'react-redux'
import { Image, Card } from 'semantic-ui-react'

class UserLeftColumn extends React.Component{

    render(){
        return(
            <div>
                <Card>
                    <Image src={this.props.user.picture}/>
                    <Card.Content>
                        <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
                        <Card.Meta>{this.props.user.age}</Card.Meta>
                        <Card.Description>
                            {this.props.user.gender} seeking {this.props.user.lookingFor}
                        </Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>{this.props.sun_sign ? this.props.sun_sign.name : null}</Card.Header>
                    </Card.Content>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.user,
    }
}


export default connect(mapStateToProps)(UserLeftColumn)