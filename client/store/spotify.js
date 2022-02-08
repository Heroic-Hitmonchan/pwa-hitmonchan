import axios from "axios";


const SET_SONG = 'SET_SONG';

export const setSong = (song) => {
    return {
        type: SET_SONG,
        song
    }
}

export const fetchSongFromSpotify = (playlistId, token, imageId) => {
    return async (dispatch) => {
        try {
            console.log("playlistId:", playlistId)
            // this fucntion going to take the rgb value and return the playlistId
            // const playlistId = jinFunction(rgb)
            // the next three playlist ids for testing, uncomment one and send the request.
            //const playlistId = '37i9dQZF1DWXb9I5xoXLjp'
            //const playlistId = '37i9dQZF1DXaXB8fQg7xif'
            //const playlistId = '37i9dQZF1DXaUDcU6KDCj4'
            const bearerToken = `Bearer ${token}`
            const { data: response } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {
                    authorization: bearerToken,
                },
            });
            console.log("response:", response)
            let max = response.tracks.items.length;

            // create a random number function
            function generateSongNum() {
                return Math.floor(Math.random() * max);
            };
            const songNumber = generateSongNum();
            await axios.post(`/api/songs/${imageId}`, {
                song: response.tracks.items[songNumber].track.uri
            })
            console.log("SETSONG:", response.tracks.items[songNumber].track)
            // this will send the track inforation as an object to the reducer.
            // including the url which can be accessed by adding .external_urls.spotify
            dispatch(setSong(response.tracks.items[songNumber].track));
            // the next line will send the track url only.
            // dispatch(setSong(response.tracks.items[songNumber].track.external_urls.spotify));
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SONG:
            return action.song
        default:
            return state
    }
}