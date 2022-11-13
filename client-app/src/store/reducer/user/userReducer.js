import { HANDLE_AUTH_STATE_CHANGE_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, SIGNIN_FAILURE, SIGNIN_GOOGLE_REQUEST, SIGNIN_REQUEST } from "./userActionTypes";

const init = {
    user: null,
    loading: true,
    idToken: null,
    error: {
        action: "",
        message: null
    }
}

export default function userReducer(state = init, { type, payload }) {
    switch (type) {
        case SIGNIN_GOOGLE_REQUEST:
        case SIGNIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                user: null,
                error: {
                    action: "",
                    message: null
                }
            };
        case REGISTER_FAILURE:
        case SIGNIN_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: {
                    action: type,
                    message: payload
                }
            };
        case HANDLE_AUTH_STATE_CHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user,
                idToken: payload.idToken,
                error: {
                    action: "",
                    message: null
                }
            };
        default:
            return state;
    }
}