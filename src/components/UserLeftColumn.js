import React from 'react'
import { connect } from 'react-redux'
import { Image, Card, Button, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const URL = 'http://localhost:3000'

class UserLeftColumn extends React.Component{

    handleTakePhoto (dataUri) {
        var blob = this.dataURItoBlob(dataUri);
        var fd = new FormData(document.forms[0]);
        fd.append("image", blob);
        console.log(fd);
        fetch(URL + '/users/' + this.props.currentUser.id,{
            method: 'PATCH',
            headers: {
                'Authorization': localStorage.getItem('auth_token'),
                "Accept": "application/json"
            },
            body: fd
        })
        .then(res => res.json())
        .then(data => {
            if (data.jwt !== 'undefined') {
                this.props.dispatch({ type: 'AUTH_SUCCESS', user: data.user})
            }
        })
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ia], {type:mimeString});
    }

    

    render(){

        const editImage = () => {
            return(
            <Modal trigger={<Button>Edit Picture?</Button>}>
                <Camera
                onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                />
            </Modal>
            )
        }

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
                likeMatchComp() : editImage()}

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