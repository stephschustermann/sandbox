import React, { useState, useEffect, useReducer, useContext } from 'react';

import * as ACTIONS from '../store/actions/actions';
import * as Reducer from '../store/hooks_state/hooks_reducer';
import Context from '../utils/context';

const HookContainer = () => {
    const context = useContext(Context);
    // const stateValue = useState(0)[0]
    // const setValue = useState(0)[1]
    //useState(0); this is the initial value for stateValue
    const [stateValue, setValue] = useState(0);
    const [useEffectValue, setUseEffectValue] = useState(null);

    const [state, dispatch] = useReducer(Reducer.HooksReducer, Reducer.initialState);

    useEffect(()=> {
        setTimeout(()=> setUseEffectValue('useEffect Worked'), 3000)
    }, [stateValue]) // this array is anytime the objects inside the array changes, this function will be called as well
    const incrementValue = () => {
        setValue(stateValue + 1)
    }

    const decrementValue = () => {
        setValue(stateValue -1)
    }

    const changeuseEffectValue = () => {
         setUseEffectValue('Some string');
    }

    const handleDispatchTrue = () => {
        dispatch(ACTIONS.success())
    }

    const handleDispatchFalse = () => {
        dispatch(ACTIONS.failure())
    }

    return(
      <div>
        React Hooks
        <br />
        <button onClick={()=> incrementValue()}> Inc Local State</button>
        <button onClick={()=> decrementValue()}> Dec Local State</button>
        <button onClick={()=> changeuseEffectValue()}> Change use effect</button>
        <button onClick={()=> handleDispatchTrue()}>Dispatch True</button>
        <button onClick={()=> handleDispatchFalse()}>Dispatch False</button>
        <button onClick={()=> context.addGlobalValue()}>addGlobalValue</button>
        <button onClick={()=> context.decGlobalValue()}>decGlobalValue</button>
        <button onClick={()=> context.dispatchContextTrue()}>dispatchContextTrue</button>
        <button onClick={()=> context.dispatchContextFalse()}>dispatchContextFalse</button>
        <br />
        {context.useContextSubmitState
        ? <h3> {context.useContextSubmitState} </h3>
        : <h3> No User Text </h3>
        }
        <br />
        {
            state.stateprop1
            ? <p>stateprop1 is true</p>
            : <p>stateprop1 is false</p>
        }
        <br />
        <div>
            <p>
                { useEffectValue
                    ? <p>{useEffectValue}</p>
                    : <p> No Value </p>
                }
            </p>
            <p>Local State: {stateValue}</p>
            <p>Global State: {context.valueGlobalState}</p>
            <br />
        {
            context.reducerGlobalState
            ? <p>stateprop2 is true</p>
            : <p>stateprop2 is false</p>
        }
        </div>
      </div>
    )
}


export default HookContainer;
