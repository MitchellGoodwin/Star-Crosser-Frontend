import React from 'react'
import { Segment, Loader, Dimmer } from 'semantic-ui-react'

class SignInfo extends React.Component{
    render(){
        const { sunSign } = this.props
        return(
            <Segment style={{width : 1200}}>
                <Dimmer active={!this.props.sunSign}><Loader/></Dimmer>
                {this.props.sunSign.name ?
                <div>
                    <h1>{sunSign.name}</h1>
                    <p>{`A sign of the ${sunSign.element} element, ${sunSign.name}'s symbol is the ${sunSign.symbol.split(' ')[1]}.`}</p>
                    <p>{`People of the ${sunSign.name} sign are born between ${sunSign.sun_dates[0]} and ${sunSign.sun_dates[1]}.`}</p>
                    <p>{`This sign is associated with ${sunSign.planet[0]} ${sunSign.planet[1]}.`}</p>
                    <h1>Main Vibe:</h1>
                    <h3>{sunSign.vibe}</h3>
                    <p>The best ways to describe this sign's characteristics are:</p>
                    <ul>
                        {sunSign.keywords.map(keyword => <li>{keyword}</li>)}
                    </ul>
                    <p>{`People with this sign tend to be ` + sunSign.good_traits.slice(0, -1) + ', and ' + sunSign.good_traits.slice(-1)[0] + '.'}</p>
                    <p>{'On the other hand, they can be ' + sunSign.bad_traits.slice(0, -1) + ', and ' + sunSign.bad_traits.slice(-1)[0] + '.'}</p>
                    <h3>They tend to like:</h3>
                    <p>{sunSign.favorites.slice(0, -1) + ', and ' + sunSign.favorites.slice(-1)[0] + '.'}</p>
                    <h3>They tend to hate:</h3>
                    <p>{sunSign.hates.slice(0, -1) + ', and ' + sunSign.hates.slice(-1)[0] + '.'}</p>
                    <h4>Traits</h4>
                    <p>{sunSign.name + ' often have certain traits.'}</p>
                    <p>{sunSign.physical_traits}</p>
                    <p>{sunSign.mental_traits.map(trait => trait + '.')}</p>
                    <h3>Wishes and Goals</h3>
                    <p>{`${sunSign.name} typical hopes include`}</p>
                    <ul>{sunSign.wish.map(w => <li>{w}</li>)}</ul>
                    <h1>Compatibility</h1>
                    <p>This sign is most compatable with people of the following signs:</p>
                    <ul>{sunSign.compatibility.map(sign => <li>{sign}</li>)}</ul>
                </div> 
            : null}
                
            </Segment>
        )
    }
}

export default SignInfo