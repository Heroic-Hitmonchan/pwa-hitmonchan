import axios from "axios";

const SET_USER = 'SET_USER';

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const fetchUserInfo = () => {
    return async(dispatch) => {
        try {
            let token = JSON.parse(window.localStorage.getItem("token")).accessToken;
            const bearerToken = `Bearer ${token}`
            const { data: response } = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    authorization: bearerToken,
                },
            });
            window.localStorage.setItem("user", JSON.stringify(response));
            dispatch(setUser(response))
        } catch(err) {
            console.log(err)
        }
    }
}

const initialState = JSON.parse(window.localStorage.getItem("user")) || {};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}