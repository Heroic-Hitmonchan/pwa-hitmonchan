import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { addfile, captureNewPhoto } from '../../store/camera'
import axios from 'axios'
import './postupload.css'

function postUpload() {

  const dispatch = useDispatch()

  const { file, photo, token, user, song } = useSelector((state) => {

    return {
      photo: state.photo,
      file: state.file,
      token: state.token,
      user: state.user,
      song: state.song
    }
  });

  const capturedImage = URL.createObjectURL(file);

  const matchSong = async () => {
    //get secure URL from server
    const { data: url } = await axios.get("api/s3Url")
    //post the image directly to the s3 bucket
    const headers = {
      "Content-Type": "multipart/form-data"
    }
    await axios.put(url, file, { headers })

    const imageUrl = url.split("?")[0]

    window.localStorage.setItem("image", JSON.stringify(imageUrl));

    dispatch(captureNewPhoto(imageUrl));
  }

  const anotherImage = () => {
    dispatch(addfile({}))
  }

  return (
    <div className="post-upload-page-div">
      <div className="post-upload-logo-div">
        <Link to="/home" onClick={anotherImage} className='post-upload-logo-div-link'>
          <img src="/logo.png" className="post-upload-links-logo" />
        </Link>
      </div>
      <img
        src={capturedImage}
      />
      <div className="post-upload-btns-div">
        <Link to="/songgeneration" onClick={matchSong} className="post-upload-links">
          Generate song
        </Link>
        <Link to="/home" onClick={anotherImage} className="post-upload-links">
          another image
        </Link>
      </div>
    </div>
  );
}

export default postUpload;
