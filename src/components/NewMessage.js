import React from 'react'
import { Form, Button, TextArea, Segment } from 'semantic-ui-react'



class NewMessage extends React.Component{


    render(){
        return(
            <Form onSubmit={this.props.handleSubmit}>
                <Segment>
                    <Form.Field>
                            <label>New Message</label>
                            <TextArea type="textarea" 
                                name='text' 
                                    placeholder="Enter text..." 
                                        onChange={this.props.handleChange}
                                            value={this.props.text} />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Segment>
            </Form>
        )
    }

}

export default NewMessage