import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { captureNewPhoto } from '../../store/camera';
import { Link } from 'react-router-dom';
import { fetchSongFromSpotify } from '../../store/spotify'
import './postcamera.css'

const Postcamera = () => {

    const capturedImage = useSelector((state) => {
        return state.camera;
    });
    const token = useSelector((state) => {
        console.log(state.token)
        return state.token
    })
    const dispatch = useDispatch();

    // for the first onclick call the function that will extract the color from the image.

    // will clear the image in the global state 
    const anotherImage = () => {
        dispatch(captureNewPhoto({}))
    }

    const getSong = () => {
        dispatch(fetchSongFromSpotify(1, token.accessToken))
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
                <Link to="/songgeneration" onClick={getSong} className="post-camera-links">
                    Generate song
                </Link>
                <Link to="/home" onClick={anotherImage} className="post-camera-links">
                    another image
                </Link>
            </div>
        </div>
    )
}

export default Postcamera