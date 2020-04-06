import React from 'react'
import { Segment, Loader, Dimmer } from 'semantic-ui-react'


class UserShowInfo extends React.Component{
    
    render(){
        return(
            <Segment raised>
                <Dimmer active={this.props.loading}>
                    <Loader active={this.props.loading} size='massive'/>
                </Dimmer>
                <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
                <h2>Location: </h2>
                <p>{this.props.user.location}</p>
                {this.props.user.bioIntro ? 
                <div>
                    <h2>Introduction</h2>
                    <p>{this.props.user.bioIntro}</p><br/>
                </div>: null}
                {this.props.user.bioActivities ? 
                <div>
                    <h2>Favorite Activities</h2>
                    <p>{this.props.user.bioActivities}</p><br/>
                </div>: null}
                {this.props.user.bioMusic ? 
                <div>
                    <h2>Music</h2>
                    <p>{this.props.user.bioMusic}</p><br/>
                </div>: null}
                {this.props.user.bioMovies ? 
                <div>
                    <h2>Movies</h2>
                    <p>{this.props.user.bioMovies}</p><br/>
                </div>: null}
                {this.props.user.bioBooks ? 
                <div>
                    <h2>Books</h2>
                    <p>{this.props.user.bioBooks}</p><br/>
                </div>: null}
                {this.props.user.bioFood ? 
                <div>
                    <h2>Favorite Food</h2>
                    <p>{this.props.user.bioFood}</p><br/>
                </div>: null}
                {this.props.user.bioGoals ? 
                <div>
                    <h2>Goals</h2>
                    <p>{this.props.user.bioGoals}</p><br/>
                </div>: null}
                {this.props.user.bioGeneral ? 
                <div>
                    <h2>General</h2>
                    <p>{this.props.user.bioGeneral}</p><br/>
                </div>: null}

            </Segment>
        )
    }
}



export default UserShowInfo