import React from 'react'
import { Card, Button, Loader, Dimmer } from 'semantic-ui-react'
import UserCard from '../components/UserCard'
import { connect } from 'react-redux'
import { getCompata, resetCompata } from '../actions/userActions'


class UsersContainer extends React.Component{

    state = {
        users: [],
        allusers: [],
        compatability: false,
    }

    handleClick = () => {
        !this.props.compatability ? 
        this.props.getCompata()
        : this.props.resetCompata()
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
                    <Button onClick={() => this.handleClick()}>
                        {this.props.compatability ? 'Show everybody' : 'Show by my sign compatability'}
                    </Button>
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
    return { getCompata: () => dispatch(getCompata()), resetCompata: () => dispatch(resetCompata()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
