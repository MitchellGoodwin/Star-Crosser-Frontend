import React from 'react'
import Message from '../components/Message'


class MessageContainer extends React.Component{

    render(){
        return(
            <div>
                {this.props.messages.map(message => <Message message={message} selected_user={this.props.selected_user}/>)}
            </div>
        )
    }
}

export default MessageContainer