import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom';

import { addfile, captureNewPhoto } from '../../store/camera'
import axios from 'axios'
// const source = 'https://jins-test-aws-bucket-react.s3.us-west-2.amazonaws.com/1643928379998'

function postUpload() {

  // let [playlist, setPlaylist] = useState('')

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
  }

  const anotherImage = () => {
    dispatch(addfile({}))
}

  return (
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
