import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  addfile } from '../../store/camera';
import './uploadphoto.css'


function uploadFile() {

  let history = useHistory()
  
  const dispatch = useDispatch();

  const handleChange = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        // console.log(target.value)
        dispatch(addfile(file));
        history.push('./postUpload')
      }
    }
  }

  return (
    <div className='upload-component-div'>
          <input name="imageInput" type="file" accept="image/*" onChange={(e) => handleChange(e.target)} id="file" className="file" />
          <label htmlFor="file" className='upload-component-div-label'>Capture / Upload </label>
    </div>
  );
}

export default uploadFile;
