import React from 'react'
import { connect } from 'react-redux'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { getImage } from '../actions/authActions'



class EditPhoto extends React.Component{

    handleTakePhoto (dataUri) {
        var blob = this.dataURItoBlob(dataUri);
        var fd = new FormData(document.forms[0]);
        fd.append("image", blob);
        console.log(fd);
        this.props.getImage(fd, this.props.currentUser.id)
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
        return(
            <div>
            <Camera
                onTakePhotoAnimationDone = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                />
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        currentUser: state.auth.user,
    }
}

function mapDispatchToProps(dispatch){
    return { getImage: (fd, id) => dispatch(getImage(fd, id)), dispatch: dispatch }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPhoto)