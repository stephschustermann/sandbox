import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../store/actions/actions';

class Container4 extends Component {
    render() {
        const usesr_text = 'ffdf';
        return (
            <div>
                <button onClick={() => this.props.auth.login()}> Login </button>
                <button onClick={() => console.log(this.props.stateProp1)}> Get State </button>
                <button onClick={()=> this.props.action_creator1()}> Dispatch Action Creator 1 </button>
                <button onClick={()=> this.props.action_creator2()}> Dispatch Action Creator 2 </button>
                <button onClick={()=> this.props.action_creator3(usesr_text)}> Dispatch Action Creator 3 </button>
                {
                    (this.props.user_text) 
                    ? (<label>{this.props.user_text}</label>)
                    : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stateProp1: state.reducer1.stateProp1,
        user_text: state.user_reducer.user_text,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action_creator1: () => dispatch(ACTIONS.success()),
        action_creator2: () => dispatch(ACTIONS.failure()),
        action_creator3: (text) => dispatch(ACTIONS.user_input(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container4);
