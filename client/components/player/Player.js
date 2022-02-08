import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AudioSpectrum from "react-audio-spectrum";
import { Link } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import useColorThief from 'use-color-thief'
import asyncEffect from '../postUpload/helper'
import colorSort from '../../store/colorSort'
import {fetchSongFromSpotify} from '../../store/spotify'

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

  const {palette} = useColorThief(setUp.upload.photo, {
    format: 'hex',
    colorCount: 10,
    quality: 1,
  })

  useEffect(() => {
    (async () => {
      if (palette) {
        console.log("palette:", palette[0])
        const currentPlaylist = colorSort(palette[0])
        // setPlaylist(currentPlaylist)
        // console.log("user:", user)
        const image = await asyncEffect(palette, setUp.user.id, setUp.upload.photo)
        // console.log("IMAGE:", image)
        dispatch(fetchSongFromSpotify(currentPlaylist, image.id))
      }
    })()
  }, [palette])

  let x = ''

  // useEffect(() => {
  //   let autoPlay
  // }, [songUri])

  // const {
  //   song: { artists, preview_url },
  // } = setUp;

  // console.log(artists[0].name)
  const songUri = setUp.song.uri;
  const songUrl = setUp.song.preview_url
  // console.log(songUri);
  return (
    <>
      <h1>Welcome to Song Generation</h1>
      <img className="user-image" src={setUp.upload.photo} />
      
        <SpotifyPlayer
        token={setUp.token}
        uris={songUri}
        autoPlay
        play
        callback={(state) => console.log(state)}
        showSaveIcon
      />

      <Link to="/home" className="post-camera-links">
        Return Home
      </Link>
    </>
  );
};

export default SongGeneration;
