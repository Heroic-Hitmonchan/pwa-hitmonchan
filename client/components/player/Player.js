import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import useColorThief from 'use-color-thief'
import asyncEffect from '../postUpload/helper'
import colorSort from '../../store/colorSort'
import { fetchSongFromSpotify, setSong } from '../../store/spotify'
import { captureNewPhoto } from '../../store/camera'
import './player.css'
import { motion } from "framer-motion"

const SongGeneration = () => {

  const dispatch = useDispatch()

  const setUp = useSelector((state) => {
    return {
      user: state.user,
      song: state.song,
      photo: state.photo,
      file: state.file,
      token: state.token.accessToken,
    };
  });

  const { palette } = useColorThief(setUp.photo, {
    format: 'hex',
    colorCount: 10,
    quality: 1,
  })

  useEffect(() => {
    (async () => {
      if (palette) {
        console.log("palette:", palette[0])

        const currentPlaylist = colorSort(palette[0])

        const image = await asyncEffect(palette, setUp.user.id, setUp.photo)
        // dispatch to fetch the song list from spotify.
        dispatch(fetchSongFromSpotify(currentPlaylist, image.id))
      }
    })()
  }, [palette])

  const clear = () => {
    window.localStorage.removeItem("song");
    window.localStorage.removeItem("image");
    dispatch(setSong({}));
    dispatch(captureNewPhoto({}))
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
      <motion.div className='player-page-div'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      >
        <motion.div className='logo-div'
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 },
        }}
        >
          <Link to="/home" className="player-home-link" onClick={clear}>
            <img src="/logo.png" className="player-home-link-logo" />
          </Link>
        </motion.div>
        <p>your photo matched with {setUp.song.name}, enjoy</p>
        <img className="user-image" src={setUp.photo} />
        <div className='player-div'>
          <SpotifyPlayer
            token={setUp.token}
            uris={songUri}
            autoPlay
            
            showSaveIcon
          />
        </div>
      </motion.div>
    );
  }
};

export default SongGeneration;
