import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../store/user";
import { setToken, updateToken } from "../../store/token";
import Camera from "../camera/Camera";
import Uploadphoto from "../uploadPhoto/Uploadphoto"
import "./home.css";
import axios from "axios";

// variables needed in the first request to spotify to get the code.
const CLIENT_ID = "12ab9fc82d684679b569135ea050d5d8";
const REDIRECT_URI = "http://localhost:8080/home";
// const REDIRECT_URI = "https://moments-pwa.herokuapp.com//home"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPE = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-library-read",
  "user-library-modify",
];
const LOGIN = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE.join(
  "%20"
)}`;

export const Home = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => {
    return state.user;
  });

  const token = useSelector((state) => {
    return state.token;
  });

  const refreshToken = useSelector((state) => {
    return state.token.refreshToken;
  });

  const expiresIn = useSelector((state) => {
    return state.token.expiresIn;
  });

  const logout = () => {
    // logout will clear the localStorage and the global state.
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    dispatch(setToken({}));
  };

  // extract the code value from the returned URL.
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code !== null) {
      //send post request with the code value to the backend to get the tokens
      axios
        .post("/api/token/login", {
          headers: {
            authorization: code,
          },
        })
        .then(({ data: response }) => {
          // saved the tokens in the localStorage.
          window.localStorage.setItem("token", JSON.stringify(response));
          // update the global state with the newly recieved tokens.
          dispatch(setToken(response));
          // invoke fetchUserInfo thunk creator to get the user info.
          dispatch(fetchUserInfo());
          // clear the URL from the code value.
          window.history.pushState({}, null, "/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code]);

  // hook for refresh token.
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    // set interval to be invoked in 59 minutes.
    const interval = setInterval(() => {
      axios
        .post("/api/token/refresh", { refreshToken })
        .then(({ data: response }) => {
          // saved the tokens in the localStorage.
          window.localStorage.setItem(
            "token",
            JSON.stringify({
              accessToken: response.accessToken,
              refreshToken,
              expiresIn: response.expiresIn,
            })
          );
          // update the global state with the newly recieved accessToken and expiresIn .
          dispatch(updateToken(response.accessToken, response.expiresIn));
        })
        .catch((err) => {
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  if (Object.keys(token).length === 0) {
    return (
      <div className='home-page-before-login-div'>
        <img src='/logo.png' />
        <p>Moments</p>
        <a href={LOGIN} className='login-btn'>Login
          with Spotify</a>
      </div>
    );
  } else {
    return (
      <div className='home-page-after-login-div'>
        <p>Hey, {userInfo.display_name}</p>
        < Camera />
        <br />
        < Uploadphoto />
        <div className='footer-home-page'>
          <div className='footer-home-page-leftside'>
            <input type='image' src='/history.png' onClick={() => ({})} id='hidtory-input' />
          </div>
          <div className='footer-home-page-rightside'>
            <input type='image' src='/setting.png' onClick={logout} id='setting-input' />
          </div>

        </div>
      </div>
    );
  }
};

export default Home;
