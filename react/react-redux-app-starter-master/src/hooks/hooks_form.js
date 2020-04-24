import React, { useState, useReducer, useContext } from 'react';
import * as ACTIONS from '../store/actions/actions';
import * as UserReducer from '../store/hooks_state/user_reducer_hooks';
import Context from '../utils/context';


const HooksForm = () => {
    const context = useContext(Context)
    const [valueChange, setValueChange] = useState('');
    const [valueSubmit, setValueSubmit] = useState('');

    const [state, dispatch] = useReducer(UserReducer.UserReducer, UserReducer.initialState)


    const handleuseStateChange = (event) => {
        setValueChange(event.target.value);
    }

    const hadleuseStateSubmit = (event) => {
        event.preventDefault();
        setValueSubmit(event.target.useState.value);
    }

    const handleuseReducerChange = (event) => (
        dispatch(ACTIONS.user_input_change(event.target.value))
      );
    
    const handleuseReducerSubmit = (event) => {
    event.preventDefault();
    dispatch(ACTIONS.user_input_submit(event.target.useReducer.value))
    };

    return (
        <div>
            <form onSubmit={hadleuseStateSubmit}>
                <label>React useState: </label>
                <input id='useState' type='text' onChange={handleuseStateChange} />
                <button type='submit'>Submit</button>
            </form>
            <br />
            <form onSubmit={handleuseReducerSubmit}>
            <label> React useReducer: </label>
            <input id="useReducer" onChange={handleuseReducerChange} type="text" />
            <button type="submit"> Submit </button>
            </form>
            <br />
            <form onSubmit={context.useContextSubmit}>
            <label> React useContext: </label>
            <input id="useContext" onChange={context.useContextChange} type="text" />
            <button type="submit"> Submit </button>
            </form>
            <br />

            <h3>React useState:</h3>
            <p>Change: {valueChange}</p>
            <p>Submit: {valueSubmit}</p>
            <br />
            <h3>React useReducer:</h3>
            <p>Change: {state.user_textChange}</p>
            <p>Submit: {state.user_textSubmit}</p>
            <br />
            <h3>React useContext:</h3>
            <p>Change: {context.useContextChangeState}</p>
            <p>Submit: {context.useContextSubmitState}</p>
            <br />
            <br />
        </div>
    )
}
    
export default HooksForm;
