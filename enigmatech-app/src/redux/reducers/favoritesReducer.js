
import { types } from "../types"

const initialState = {
    favorites: [],
    favorite: {}
}

export const favoritesReducer = ( state = initialState , action ) => {
    switch ( action.type ) {
        case types.addFavorite:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        
        case types.setFavorites:
            return {
                ...state,
                favorites: [ ...action.payload ]
            }

        case types.setFavorite:
            return {
                ...state,
                favorite: action.payload
            }

        case types.editFavorite:
            return {
                ...state,
                favorites: state.favorites.map( data => data.id === action.payload.id 
                    ?  { ...data, note: action.payload.note }
                    :  data
                )
            }

        case types.deleteFavorite:
            return {
                ...state,
                favorites: state.favorites.filter( data => data.id !== action.payload )
            }
        default:
            return state;
    }
}