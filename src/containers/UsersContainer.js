import React from 'react'
import { Card, Button, Loader, Dimmer, Form, Checkbox } from 'semantic-ui-react'
import UserCard from '../components/UserCard'
import { connect } from 'react-redux'
import { getCompata, resetCompata, sendFilter } from '../actions/userActions'
import FilterForm from '../components/FilterForm'



class UsersContainer extends React.Component{

    state = {
        compatibility: false,
        age: false,
        distance: false,
        maxDistance: 100,
        maxAge: 40,
        minAge: 18,
        showForm: false
    }

    handleClick = () => {
        this.props.resetCompata()
    }

    toggleForm = () => {
        this.setState({showForm: !this.state.showForm})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendFilter(this.state)
    }

    handleToggle = (e) => {
        this.setState({[e]: !this.state[e]})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    filterForm = () => {
        return(
            <Form onSubmit={this.handleSubmit}>
                    <h3>Filters</h3>
                    <Form.Field>
                        <Checkbox toggle checked={this.state.compatibility} onChange={() => this.handleToggle('compatibility')} name='compatibility' label='Show only compatabile signs' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox toggle checked={this.state.distance} onChange={() => this.handleToggle('distance')} name='distance' label='Filter by distance?' />
                    </Form.Field>
                        <input type="range" style={this.state.distance ? null :{display: 'none'} } onChange={this.handleChange} min="25" step='25' max="500" name='maxDistance' value={this.state.maxDistance} className="slider"></input><br/>
                        <label style={this.state.distance ? null :{display: 'none'} }>Distance: {this.state.maxDistance} miles</label><br/>
                    <Form.Field>
                        <Checkbox toggle checked={this.state.age} onChange={() => this.handleToggle('age')} name='age' label='Filter by age?' />
                    </Form.Field>
                        <input type="range" style={this.state.age ? null :{display: 'none'} } onChange={this.handleChange} min="18" step='1' max={this.state.maxAge} name='minAge' value={this.state.minAge} className="slider"></input><br/>
                        <input type="range" style={this.state.age ? null :{display: 'none'} } onChange={this.handleChange} min={this.state.minAge} step='1' max="100" name='maxAge' value={this.state.maxAge} className="slider"></input><br/>
                        <label style={this.state.age ? null :{display: 'none'} }>Find people with an age between {this.state.minAge} and {this.state.maxAge}</label><br/>
                    <Button type='submit'>Filter</Button>
                </Form>
        )
    }

    render() { 
        return(
            <div>
            { this.props.loading ?
            <Dimmer active inverted>
                <Loader active size='massive'>
                    Searching the Stars
                </Loader>
            </Dimmer> :
                <div>
                    <Button onClick={() => this.toggleForm()}>
                        Filter Search
                    </Button>
                    <Button onClick={() => this.handleClick()}>
                        Reset Search
                    </Button>
                    {this.state.showForm ? 
                        <FilterForm compatibility={this.state.compatibility} distance={this.state.distance} age={this.state.age}
                        maxDistance={this.state.maxDistance} maxAge={this.state.maxAge} minAge={this.state.minAge}
                        handleChange={this.handleChange} handleToggle={this.handleToggle} handleSubmit={this.handleSubmit}/>
                        : null}
                    <br/> <br/>
                    <Card.Group itemsPerRow='2'>
                        {this.props.users.map(user => {return <UserCard user={user} />})}
                    </Card.Group>
                </div>
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { users: state.explore.users, loading: state.explore.loading, compatability: state.explore.compatability }
}

function mapDispatchToProps(dispatch){
    return { getCompata: () => dispatch(getCompata()), 
        resetCompata: () => dispatch(resetCompata()),
        sendFilter: (data) => dispatch(sendFilter(data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
