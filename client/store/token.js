import axios from 'axios'

const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token) => {
    // window.localStorage.setItem("token", JSON.stringify(token));
    return {
        type: SET_TOKEN,
        token
    }
}

const initialState = JSON.parse(window.localStorage.getItem("token")) || {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return action.token
        default:
            return state
    }
}