import React from 'react'
import { connect } from 'react-redux'
import { Image, Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserLeftColumn extends React.Component{



    

    render(){

        const likeMatchComp = () => {
            return ( this.props.matches.length > 0 ?
            (
                <Card>
                    <Card.Content>
                        <Card.Header>
                            You've matched!
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                    <Button basic color='red' onClick={this.props.handleUnmatchClick}>
                        UnMatch
                    </Button>
                    </Card.Content>
                </Card>
            )    
                :
            this.props.likes.length === 0 ?
            (
                <Card>
                    <Card.Content>
                        <Card.Header>
                            Why not like this person?
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                    <Button basic color='green' onClick={this.props.handleLikeClick}>
                        Like
                    </Button>
                    </Card.Content>
                </Card>
            ) :
            (
                <Card>
                    <Card.Content>
                        <Card.Header>
                            You like this person
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                    <Button basic color='red' onClick={this.props.handleUnlikeClick}>
                        UnLike
                    </Button>
                    </Card.Content>
                </Card>
            )
            )
        }

        return(
            <div>
                <Card>
                    <Image src={this.props.user.image_url} size='large'/>
                    <Card.Content>
                        <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
                        <Card.Meta>{this.props.user.age}</Card.Meta>
                        <Card.Description>
                            {this.props.user.gender} seeking {this.props.user.lookingFor}
                        </Card.Description>
                    </Card.Content>
                </Card>

                {this.props.user.id !== this.props.currentUser.id ?
                likeMatchComp() : null}

                <Link to={'/sign/'  + (this.props.sun_sign ? this.props.sun_sign.id : '')}>
                    <Card>
                        <Card.Content>
                            <Card.Header>{this.props.sun_sign ? this.props.sun_sign.name : null}</Card.Header>
                        </Card.Content>
                    </Card>
                </Link>
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