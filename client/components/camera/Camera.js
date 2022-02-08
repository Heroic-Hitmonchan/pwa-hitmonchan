import React from 'react';
import { captureNewPhoto } from '../../store/camera';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import history from "../../history";
import './camera.css'

const Camera = () => {

    const dispatch = useDispatch();

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                // console.log(file)
                const newUrl = URL.createObjectURL(file);
                dispatch(captureNewPhoto(newUrl));
                history.push('./postcamera')
            }
        }
    }

    return (
        <div className='camera-component-div'>
                <input type="file" accept="image/x-png,image/jpeg,image/gif"
                    onChange={(e) => handleCapture(e.target)} id="file" className="file" />
            <label htmlFor="file" className='camera-component-div-label'>Capture / Upload </label>
        </div>
    )
}

export default Camera
