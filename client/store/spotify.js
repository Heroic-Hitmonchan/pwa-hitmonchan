import axios from "axios";


const SET_SONG = 'SET_SONG';

export const setSong = (song) => {
    return {
        type: SET_SONG,
        song
    }
}

export const fetchSongFromSpotify = (playlistId, imageId) => {
    return async (dispatch) => {
        try {
            let token = JSON.parse(window.localStorage.getItem("token")).accessToken
            
            const bearerToken = `Bearer ${token}`
            
            const { data: response } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {
                    authorization: bearerToken,
                },
            });
            
            let max = response.tracks.items.length;

            // create a random number function
            function generateSongNum() {
                return Math.floor(Math.random() * max);
            };
            const songNumber = generateSongNum();
            await axios.post(`/api/songs/${imageId}`, {
                song: response.tracks.items[songNumber].track.uri
            })
            window.localStorage.setItem("song", JSON.stringify(response.tracks.items[songNumber].track));
            // this will send the track inforation as an object to the reducer.
            // including the url which can be accessed by adding .external_urls.spotify
            dispatch(setSong(response.tracks.items[songNumber].track));
            
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = JSON.parse(window.localStorage.getItem("song")) || {};


export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SONG:
            return action.song
        default:
            return state
    }
}