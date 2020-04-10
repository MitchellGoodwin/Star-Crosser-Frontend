import React from 'react'
import { Button, Form, Checkbox, Segment } from 'semantic-ui-react'

const FilterForm = (props) => {
    return(
        <Segment compact color='green' >
            <Form onSubmit={props.handleSubmit}>
                    <h3>Filters</h3>
                    <Form.Field>
                        <Checkbox toggle checked={props.compatibility} onChange={() => props.handleToggle('compatibility')} name='compatibility' label='Show only compatabile signs' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox toggle checked={props.distance} onChange={() => props.handleToggle('distance')} name='distance' label='Filter by distance?' />
                    </Form.Field>
                        <input type="range" style={props.distance ? null :{display: 'none'} } onChange={props.handleChange} min="25" step='25' max="500" name='maxDistance' value={props.maxDistance} className="slider"></input><br/>
                        <label style={props.distance ? null :{display: 'none'} }>Distance: {props.maxDistance} miles</label><br/>
                    <Form.Field>
                        <Checkbox toggle checked={props.age} onChange={() => props.handleToggle('age')} name='age' label='Filter by age?' />
                    </Form.Field>
                        <label style={props.age ? null :{display: 'none'} }>Min Age: </label>
                        <input type="range" style={props.age ? null :{display: 'none'} } onChange={props.handleChange} min="18" step='1' max={props.maxAge} name='minAge' value={props.minAge} className="slider"></input><br/>
                        <label style={props.age ? null :{display: 'none'} }>Max Age: </label>
                        <input type="range" style={props.age ? null :{display: 'none'} } onChange={props.handleChange} min={props.minAge} step='1' max="100" name='maxAge' value={props.maxAge} className="slider"></input><br/>
                        <label style={props.age ? null :{display: 'none'} }>Find people with an age between {props.minAge} and {props.maxAge}</label><br/>
                    <Button type='submit'>Filter</Button>
            </Form>
        </Segment>
    )
}

export default FilterForm