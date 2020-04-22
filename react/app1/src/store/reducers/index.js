import reducer1 from './reducer1';
import user_reducer from './user_reducer';
import auth_reducer from './auth_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    reducer1,
    user_reducer,
    auth_reducer,
})

export default rootReducer;