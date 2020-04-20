import React, { Component } from 'react';

class Container1 extends Component {
    Arr1 = [
        { id: 1, text: 'text1', number: 1 },
        { id: 2, text: 'text2', number: 2 },
        { id: 3, text: 'text3', number: 3 },
        { id: 4, text: 'text4', number: 4 },
        { id: 5, text: 'text5', number: 5 },
    ];

    constructor(props){
        super(props);
        this.state = {
            stateProp1: "our initial state",
        }

    }

    changeState() {
        this.setState({ stateProp1: 'new state' });
    }

    RenderListItem(props) {
        return (
            <div>
                {props.item.text}
                <p>{props.item.number}</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                <button onClick={()=>this.changeState()}>
                    Change State
                </button>
                { this.props.nickname }
                { this.state.stateProp1 }
                <br/>
                { this.Arr1.map((item) => (<this.RenderListItem key={item.id} item={item} />))}
            </div>
        )
    }
}

export default Container1;