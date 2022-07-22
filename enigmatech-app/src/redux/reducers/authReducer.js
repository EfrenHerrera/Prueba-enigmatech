
import { types } from "../types"

const initialState = {
    user: {},
    tokenSpotify: {}
}

export const authReducer = ( state = initialState , action ) => {
    switch ( action.type ) {
        case types.login:
            return {
                ...state,
                user: action.payload.data
            }

        case types.logOut:
            return initialState

        case types.setTokenSpotify:
            return {
                ...state,
                tokenSpotify: action.payload
            }
            
        default:
            return state;
    }
}