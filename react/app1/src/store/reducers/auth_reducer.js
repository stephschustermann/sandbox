import * as ACTION_TYPES from "../actions/action_types";

const initialState = {
    is_authenticated: false,
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCES:
            return {
                ...state,
                is_authenticated: true,
            };
        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                is_authenticated: false,
            };
        default:
            return state;

    }
}

export default authReducer;