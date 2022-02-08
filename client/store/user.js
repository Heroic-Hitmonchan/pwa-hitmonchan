import axios from "axios";

const SET_USER = 'SET_USER';

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

// thunk creator that fetch user info from spotify.
export const fetchUserInfo = () => {
    return async(dispatch) => {
        try {
            // get the accessToken from localStorage
            let token = JSON.parse(window.localStorage.getItem("token")).accessToken;
            // add Bearer string to the token.
            const bearerToken = `Bearer ${token}`
            const { data: response } = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    authorization: bearerToken,
                },
            });

            const {display_name, id} = response

            const { data:res } = await axios.post('/api/users/', {display_name, id})
            console.log("response received:", res)
            // saved the info in the localStorage
            window.localStorage.setItem("user", JSON.stringify(response));
            // update global state with the recieved info.
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