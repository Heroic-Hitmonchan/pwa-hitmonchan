import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSongFromSpotify } from '../../store/spotify'
import { fetchUserInfo } from '../../store/user'
import { setToken } from '../../store/token'
import Camera from '../camera/Camera'
import './home.css'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

const CLIENT_ID = "12ab9fc82d684679b569135ea050d5d8"
const CLIENT_SECRET = '3c13d792c46d4c33a76bd6b2e8b5de94'
const REDIRECT_URI = "http://localhost:8080/home"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
// const RESPONSE_TYPE = "token"
const RESPONSE_TYPE = "code"

// const credentials = {
//   clientId: "12ab9fc82d684679b569135ea050d5d8",
//   clientSecret: '3c13d792c46d4c33a76bd6b2e8b5de94',
//   redirectUri: "http://localhost:8080/home"
// };

export const Home = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => {
    return state.user
  })

  const token = useSelector((state) => {
    return state.token
  })


  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    dispatch(setToken({}))
  }
  // const [token, setToken] = useState('')
  // const [accessToken, setAccessToken] = useState()
  // const [refreshToken, setRefreshToken] = useState()
  // const [expiresIn, setExpiresIn] = useState()

  // useEffect(() => {
  // const hash = window.location.hash
  // console.log(window.location.search)
  // let token = window.localStorage.getItem("token")

  const code = new URLSearchParams(window.location.search).get('code')
  // console.log(window.location.search)
  // useAuth(code)
  // async() => {
  //   console.log(hello)
  //   try {
  //     const data = await axios.post('/api/token')
  //     console.log(data)
  //   } catch (err) {
  //     console.log(err)
  //   }

  // }
  // useEffect(() => {
  //   setToken(window.localStorage.getItem("token"))
  // }, [])

  console.log(code)
  
    // console.log(code)
    useEffect(() => {
      if (code !== null ) {
      axios.post('/api/token', {
        headers: {
          authorization: code,
        },
      }).then(({ data: response }) => {
        window.localStorage.setItem("token", JSON.stringify(response));
        
        // setAccessToken(response.accessToken);
        // setRefreshToken(response.refreshToken);
        // setExpiresIn(response.expiresIn);
        dispatch(setToken(response))
        dispatch(fetchUserInfo());
        window.history.pushState({}, null, "/")
        // console.log('hello')
        
      })
        .catch((err) => {
          console.log(err);
       
        })
      }

    }, [code])
    // useAuth(code)
  







  // let x = new spotifyApi(credentials);
  // try{
  //   const data = spotifyApi.authorizationCodeGrant(code)
  //   console.log(data)
  // } catch(err) {
  //   console.log(err)
  // }
  // spotifyApi.authorizationCodeGrant(code).then((data) => 
  // { 
  //   console.log(data)
  // }).catch((err) => {
  //   console.log(err);
  // })

  // spotifyApi.authorizationCodeGrant(code).then((data) => 
  // { 
  //   console.log(data)
  // }).catch((err) => {
  //   console.log(err);
  // })

  // console.log(token)
  // if (!token && hash) {
  //   token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  //   window.location.hash = ""
  //   window.localStorage.setItem("token", token);
  //   dispatch(fetchUserInfo())
  // }
  // setToken(token);

  // let x = JSON.parse(window.localStorage.getItem("token"))
  // console.log('token =======  ', x)

  // console.log(token)
  

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
