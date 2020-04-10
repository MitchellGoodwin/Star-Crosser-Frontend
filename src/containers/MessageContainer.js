import React, { useEffect, useRef } from 'react'
import Message from '../components/Message'
import { Segment, Header } from 'semantic-ui-react'

const MessageContainer = ({ messages, selected_user }) => {


        const messagesEndRef = useRef(null)

        const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView({ 
                behavior: "smooth",
                block: "nearest"
            })
        }

        useEffect(scrollToBottom, [messages]);

        return(
            <div className='inboxMessages'>
                {selected_user ? <div>
                {messages.map(message => <Message message={message} selected_user={selected_user}/>)}
                </div>
                
            : <Segment placeholder vertical size='massive' inverted style={{height: '100%'}}>
                <Header textAlign='center'>
                    Select a person to message
                    <Header.Subheader style={{color: 'white'}}>
                        Remeber, you can only message an unmatched person once!
                    </Header.Subheader>
                </Header>

            </Segment>}
            <div ref={messagesEndRef} />
            </div>
        )
}

export default MessageContainer