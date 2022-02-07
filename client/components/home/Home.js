import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserInfo } from '../../store/user'
import { setToken } from '../../store/token'
import Camera from '../camera/Camera'
import './home.css'
import axios from 'axios'

// variables needed in the first request to spotify to get the code.
const CLIENT_ID = "12ab9fc82d684679b569135ea050d5d8"
const REDIRECT_URI = "http://localhost:8080/home"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"

export const Home = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => {
    return state.user
  })

  const token = useSelector((state) => {
    return state.token
  })

  const logout = () => {
    // logout will clear the localStorage and the global state.
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    dispatch(setToken({}))
  }

  // extract the code value from the returned URL.
  const code = new URLSearchParams(window.location.search).get('code')

  useEffect(() => {
    if (code !== null) {
      //send post request with the code value to the backend to get the tokens
      axios.post('/api/token', {
        headers: {
          authorization: code,
        },
      }).then(({ data: response }) => {
        // saved the tokens in the localStorage.
        window.localStorage.setItem("token", JSON.stringify(response));
        // update the global state with the newly recieved tokens.
        dispatch(setToken(response))
        // invoke fetchUserInfo thunk creator to get the user info.
        dispatch(fetchUserInfo());
        // clear the URL from the code value.
        window.history.pushState({}, null, "/")
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [code])

  // will add the refresh token useffect later.

  if (Object.keys(token).length === 0) {
    return (
      <div>
        <h3>this is the home page before login</h3>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} className='login-btn'>Login
          to Spotify</a>
      </div>
    )
  } else {
    return (
      <div>
        <h3>this is the home page after login</h3>
        <h1>Hey, {userInfo.display_name}</h1>
        < Camera />
        <button onClick={logout}>Logout</button>
      </div>
    )
  }
}

export default Home
