import React from 'react';
import { captureNewPhoto } from '../../store/camera';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import  history  from "../../history";

const Camera = () => {

    const dispatch = useDispatch();

    const handleCapture = (target) => {
        if (target.files) {
            if ( target.files.length !== 0 ) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                dispatch(captureNewPhoto(newUrl));
                history.push('./postcamera')
            }
        }
    }

    return (
        <div>
            <input type="file" accept="image/x-png,image/jpeg,image/gif" 
            onChange={(e) => handleCapture(e.target)}
            />
        </div>
    )
}

export default Camera
