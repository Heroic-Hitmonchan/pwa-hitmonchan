import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import useColorThief from 'use-color-thief'
import asyncEffect from '../postUpload/helper'
import colorSort from '../../store/colorSort'
import { fetchSongFromSpotify } from '../../store/spotify'
import './player.css'

const SongGeneration = () => {

  const dispatch = useDispatch()

  const setUp = useSelector((state) => {
    return {
      user: state.user,
      song: state.song,
      upload: state.upload,
      token: state.token.accessToken,
    };
  });

  const { palette } = useColorThief(setUp.upload.photo, {
    format: 'hex',
    colorCount: 10,
    quality: 1,
  })

  useEffect(() => {
    (async () => {
      if (palette) {
        console.log("palette:", palette[0])

        const currentPlaylist = colorSort(palette[0])

        const image = await asyncEffect(palette, setUp.user.id, setUp.upload.photo)
        // dispatch to fetch the song list from spotify.
        dispatch(fetchSongFromSpotify(currentPlaylist, image.id))
      }
    })()
  }, [palette])

  const clear = () => {
    window.localStorage.removeItem("song");
  }

  const songUri = setUp.song.uri;
  const songUrl = setUp.song.preview_url

  if (Object.keys(setUp.song).length === 0) {
    return (
      <div className='loading-div'>
        <p>SEARCHING FOR PERFECT MATCH</p>
      </div>
    )
  } else {
    return (
      <div className='player-page-div'>
        <div className='logo-div'>
          <Link to="/home" className="player-home-link" onClick={clear}>
            <img src="/logo.png" className="player-home-link-logo" />
          </Link>
        </div>
        <p>your photo matched with {setUp.song.name}, enjoy</p>
        <img className="user-image" src={setUp.upload.photo} />
        <div className='player-div'>
        <SpotifyPlayer
          token={setUp.token}
          uris={songUri}
          autoPlay
          play
          showSaveIcon
        />
        </div>
      </div>
    );
  }
};

export default SongGeneration;
