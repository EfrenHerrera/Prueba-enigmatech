import Axios from "axios";

import { BaseUrlLocal, types } from '../types';

export const LoginGraphql = (data, setCookie) => {
    return async (dispatch) =>{
        var graphql = JSON.stringify({
            query: `query {
                login(email: \"${data.email}\", password: \"${data.password}\"){
                    id
                    token
                }
            }`,
            variables: {}
        });
        var config = {
            method: 'post',
            url: 'http://localhost:8080/graphql',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : graphql
        };
        await Axios(config)
            .then(resp => {
                setCookie('authToken', resp.data.data.login, { path: '/', expires: new Date(Date.now() + 1 * 60 * 24 * 365 * 365 * 365) })
                dispatch(login(resp.data.data.login));
            })
            .catch(err => console.log(err))
    }
}
export const startLoginEmailPassword = (data, setCookie) => {
    return async (dispatch) => {
        const url = "/auth/login"; 
        await Axios.post(BaseUrlLocal + url, data).then(resp => {
            setCookie('authToken', resp.data, { path: '/', expires: new Date(Date.now() + 1 * 60 * 24 * 365 * 365 * 365) })
            dispatch(login(resp.data));
            
        }).catch(e => {
        });
    }
}

export const RegisterNewUser = (data, setCookie) => {
    return async (dispatch) => {
        const url = "user/";
        await Axios.post(BaseUrlLocal + url, data).then(resp => {
            setCookie('authToken', resp.data, { path: '/', expires: new Date(Date.now() + 1 * 60 * 24 * 365 * 365 * 365) })
            dispatch(login(resp.data));
        }).catch(e => {});
    }
}

export const setTokenSpotify = (data) => ({
    type: types.setTokenSpotify,
    payload: data
});

export const login = (data) => ({
    type: types.login,
    payload: {
        data
    }
});

export const logout = () => ({
    type: types.logOut
});
