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

    const dispatch = useDispatch();

    // for the first onclick call the function that will extract the color from the image.

    // will clear the image in the global state 
    const anotherImage = () => {
        dispatch(captureNewPhoto({}))
    }

    // const getSong = () => {
    //     dispatch(fetchSongFromSpotify(1,'BQB6logd70BAjLps5sIjD6rZY6nCJDh1J5pEj0LgenxIAAsqQPpvvjUo9_JX_4Wu4PFaDVSHBqyV2ZmV9Suyc0Mk35Z_yRJr9HdAgaCCF2oyiGENGBlfl9eXknRQU0A_WrnGRtk3VZyXmuYOBGsdBQapeXe1xCwCdCLVoYCoZK5srSbo3RwGB93NvbpofK1tMMFulZi-SQ'))
    // }



    return (
        <div>
            <h1>I'm the post camera component</h1>
            {/* <button onClick={getSong}>song</button> */}
            <img
                src={capturedImage}
            />
            <Link to="/player" onClick={() => { }} className="post-camera-links">
                Generate song
            </Link>
            <Link to="/camera" onClick={anotherImage} className="post-camera-links">
                another image
            </Link>
            <Link to="/home" onClick={anotherImage} className="post-camera-links">
                Cancel
            </Link>
        </div>
    )
}

export default Postcamera