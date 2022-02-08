import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useColorThief from 'use-color-thief'
import colorSort from '../../store/colorSort'
import asyncEffect from './helper'
import { Link } from 'react-router-dom';
import {fetchSongFromSpotify} from '../../store/spotify'
import Player from '../player/Player'
import { addfile, captureNewPhoto } from '../../store/camera'
import axios from 'axios'
// const source = 'https://jins-test-aws-bucket-react.s3.us-west-2.amazonaws.com/1643928379998'

function postUpload() {

  let [playlist, setPlaylist] = useState('')

  const dispatch = useDispatch()

  const {upload, token, user, song} = useSelector((state) => {
      return {
        upload: state.upload,
        token: state.token,
        user: state.user,
        song: state.song
      }
  });

  const capturedImage = URL.createObjectURL(upload.file);

  const matchSong = async () => {
    //get secure URL from server
    const { data: url } = await axios.get("api/s3Url")
    console.log(url)
    //post the image directly to the s3 bucket
    const headers = {
      "Content-Type": "multipart/form-data"
    }
    await axios.put(url, upload.file, { headers })
    const imageUrl = url.split("?")[0]
    dispatch(captureNewPhoto(imageUrl));
    // history.push('/postUpload')
  }

  // const {palette} = useColorThief(upload.photo, {
  //   format: 'hex',
  //   colorCount: 10,
  //   quality: 1,
  // })

  // useEffect(() => {
  //   (async () => {
  //     if (palette) {
  //       console.log("palette:", palette[0])
  //       const currentPlaylist = colorSort(palette[0])
  //       setPlaylist(currentPlaylist)
  //       console.log("user:", user)
  //       const image = await asyncEffect(palette, user.id, upload.photo)
  //       console.log("IMAGE:", image)
  //       dispatch(fetchSongFromSpotify(currentPlaylist, token.accessToken, image.id))
  //     }
  //   })()
  // }, [palette])
  
  // useEffect(() => {
  //   if (image) {
  //     console.log("image:", image)
  //   }
  // }, [image])
  const anotherImage = () => {
    dispatch(addfile({}))
}

  return (
    // <div>
    //   {playlist.length ? <div>Playlist ID: {playlist}</div> : <div>Finding your song...</div>}
    //   {song.id ? <div>Song ID: {song.uri}</div> : <div>Generating song id...</div>}
    //   {song.id && <Player />}
    // </div>
    <div className="post-camera-page-div">
            <div className="post-camera-logo-div">
                <Link to="/home" onClick={anotherImage} >
                    <img src="/logo.png" className="post-camera-links-logo" />
                </Link>
            </div>
            <img
                src={capturedImage}
            />
            <div className="post-camera-btns-div">
                <Link to="/songgeneration" onClick={matchSong} className="post-camera-links">
                    Generate song
                </Link>
                <Link to="/home" onClick={anotherImage} className="post-camera-links">
                    another image
                </Link>
            </div>
        </div>
  );
}

export default postUpload;
