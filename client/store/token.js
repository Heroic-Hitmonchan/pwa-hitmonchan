import axios from 'axios'

const SET_TOKEN = 'SET_TOKEN';
const UPDATE_TOKEN = 'UPDATE_TOKEN'

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        token
    }
}

export const updateToken = (accessToken, expiresIn) => {
    return {
        type: UPDATE_TOKEN,
        accessToken,
        expiresIn
    }
}

const initialState = JSON.parse(window.localStorage.getItem("token")) || {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return action.token
        case UPDATE_TOKEN:
            return { ...state, accessToken: action.accessToken, expiresIn: action.expiresIn }
        default:
            return state
    }
}