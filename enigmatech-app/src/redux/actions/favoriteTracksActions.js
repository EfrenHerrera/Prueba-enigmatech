import Axios from "axios";
import Swal from "sweetalert2";

import { BaseUrlLocal, types } from '../types';


export const getFavoritesUser = (id) => {
    return async (dispatch) => {
        const url = `tracks/${id}`;
        await Axios.get(BaseUrlLocal + url).then(resp => {
            dispatch(setTrackFavoriteList(resp.data))
        }).catch(e => {
        });
    }
}

export const addFavorites = (data) => {
    return async (dispatch) => {
        const url = "tracks/addFavorite";
        await Axios.post(BaseUrlLocal + url, data).then(resp => {
            dispatch(setTrackFavoritetoList(resp.data))
        }).catch(e => {
        });
    }
}

export const EditFavorite = (data, id) => {
    return async (dispatch) => {
        const url = `tracks/${id}`;
        await Axios.put(BaseUrlLocal + url, data).then(resp => {
            if(resp.status === 200){
                // Swal.
                dispatch(setEditFavorite(data))
            }
        }).catch(e => {
        });
    }
}

export const DeleteFavorite = (id) => {
    return async (dispatch) => {
        const url = `tracks/${id}`;
        await Axios.delete(BaseUrlLocal + url).then(resp => {
            if(resp.status === 200){
                // Swal.
                dispatch(setDeleteFavorite(id))
            }
        }).catch(e => {
        });
    }
}

export const setTrackFavoritetoList = (data) => ({
    type: types.addFavorite,
    payload: data
});

export const setTrackFavoriteList = (data) => ({
    type: types.setFavorites,
    payload: data
});

export const setTrackFavorite = (data) => ({
    type: types.setFavorite,
    payload: data
});

export const setEditFavorite = (data) => ({
    type: types.editFavorite,
    payload: {
        note: data.note,
        id: data.id
    }
});

export const setDeleteFavorite = (id) => ({
    type: types.deleteFavorite,
    payload: id
});


