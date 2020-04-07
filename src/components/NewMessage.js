import React from 'react'
import { Form, Button, TextArea, Segment } from 'semantic-ui-react'



class NewMessage extends React.Component{


    render(){

        const errorMessage = 'You can only send one message to an unmatched user. Make sure the first message is a good one!'

        return(
            <Form onSubmit={this.props.handleSubmit} className='inboxForm'>
                <Segment>
                    <Form.Field>
                            <label>New Message</label>
                            <TextArea type="textarea" 
                                name='text' 
                                    placeholder="Enter text..." 
                                        onChange={this.props.canMessage ? this.props.handleChange : null}
                                            value={this.props.canMessage ? this.props.text : errorMessage} />
                    </Form.Field>
                    <Button disabled={!this.props.canMessage} type='submit'>Submit</Button>
                </Segment>
            </Form>
        )
    }

}

export default NewMessage