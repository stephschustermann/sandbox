import React, { Component } from 'react';

class Container2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Name </label>
                    <input id='name' type="text" onChange={this.handleChange}/>
                    <button type="submit"> Submit </button>
                </form>
            </div>
        )
    }
}

export default Container2;