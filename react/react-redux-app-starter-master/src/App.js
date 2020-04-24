import React, { useState, useReducer }  from 'react';
import Routes from './routes';
import Context from './utils/context';

import * as ACTIONS from './store/actions/actions';
import * as Reducer from './store/hooks_state/hooks_reducer';
import * as UserReducer from './store/hooks_state/user_reducer_hooks';

//main app 
const App = () => {
  const [stateGlobal, setStateGlobal] = useState(0);
  const [stateContextGlobal, dispatchcontextGlobal] = useReducer(Reducer.HooksReducer, Reducer.initialState);
  const [stateContext, dispatchContext] = useReducer(UserReducer.UserReducer, UserReducer.initialState);
  
  const incrementGlobalState = () => {
    setStateGlobal(stateGlobal + 1)
  }
  const decrementGlobalState = () => {
    setStateGlobal(stateGlobal - 1)
  }

  const handleContextDispatchTrue = () => {
    dispatchcontextGlobal(ACTIONS.success())
  }

  const handleContextDispatchFalse = () => {
    dispatchcontextGlobal(ACTIONS.failure())
  }

  const handleuseContextChange = (event) => {
    dispatchContext(ACTIONS.user_input_change(event.target.value))
  };

  const handleuseContextSubmit = (event) => {
    event.preventDefault();
    event.persist();
    dispatchContext(ACTIONS.user_input_submit(event.target.useContext.value))
  };

    return(
      <div>
      React
      <Context.Provider value={{
        valueGlobalState: stateGlobal,
        addGlobalValue: () => incrementGlobalState(),
        decGlobalValue: () => decrementGlobalState(),
        reducerGlobalState: stateContextGlobal.stateprop2,
        dispatchContextTrue: () => handleContextDispatchTrue(),
        dispatchContextFalse: () => handleContextDispatchFalse(),

        useContextChangeState: stateContext.user_textChange,
        useContextSubmitState: stateContext.user_textSubmit,
        useContextSubmit: (event) => handleuseContextSubmit(event),
        useContextChange: (event) => handleuseContextChange(event)
      }}>
        <Routes />
      </Context.Provider>
      </div>
    )
}


export default App;
