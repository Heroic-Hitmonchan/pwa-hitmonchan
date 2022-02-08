import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useColorThief from 'use-color-thief'
import colorSort from '../../store/colorSort'
import asyncEffect from './helper'
import {fetchSongFromSpotify} from '../../store/spotify'
import Player from '../player/Player'
// const source = 'https://jins-test-aws-bucket-react.s3.us-west-2.amazonaws.com/1643928379998'

function postUpload() {

  let [playlist, setPlaylist] = useState('')

  const dispatch = useDispatch()

  const {camera, token, user, song} = useSelector((state) => {
      return {
        camera: state.camera,
        token: state.token,
        user: state.user,
        song: state.song
      }
  });

  const {palette} = useColorThief(camera, {
    format: 'hex',
    colorCount: 10,
    quality: 1,
  })

  useEffect(() => {
    (async () => {
      if (palette) {
        console.log("palette:", palette[0])
        const currentPlaylist = colorSort(palette[0])
        setPlaylist(currentPlaylist)
        console.log("user:", user)
        const image = await asyncEffect(palette, user.id, camera)
        console.log("IMAGE:", image)
        dispatch(fetchSongFromSpotify(currentPlaylist, token.accessToken, image.id))
      }
    })()
  }, [palette])
  
  // useEffect(() => {
  //   if (image) {
  //     console.log("image:", image)
  //   }
  // }, [image])

  return (
    <div>
      {playlist.length ? <div>Playlist ID: {playlist}</div> : <div>Finding your song...</div>}
      {song.id ? <div>Song ID: {song.uri}</div> : <div>Generating song id...</div>}
      {song.id && <Player />}
    </div>
  );
}

export default postUpload;
