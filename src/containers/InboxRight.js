import React from 'react'
import MessageContainer from './MessageContainer'
import NewMessage from '../components/NewMessage'


class InboxRight extends React.Component{



    render(){
        return(
            <div className='inboxR'>
                <MessageContainer selected_user={this.props.selected_user} messages={this.props.messages}/>
                <NewMessage canMessage={this.props.canMessage} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} text={this.props.text}/>
            </div>
        )
    }
}

export default InboxRight