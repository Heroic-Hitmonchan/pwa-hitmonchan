import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { captureNewPhoto, addfile } from '../../store/camera';
import axios from 'axios'

function uploadFile() {
  let history = useHistory()
  const [source, setSource] = useState('')
  const [currentImag, setCurrentImage] = useState('')
  const dispatch = useDispatch();

  const image = useSelector((state) => {
    return state.camera;
  });

  const handleChange = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        dispatch(addfile(file));
        history.push('./postUpload')
      }
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log('e.target:', e.target.imageInput)
  //   const file = e.target.imageInput.files[0]
  //   console.log("file:", file)

  //   //get secure URL from server
  //   const { data: url } = await axios.get("api/s3Url")
  //   console.log(url)

  //   //post the image directly to the s3 bucket
  //   const headers = {
  //     "Content-Type": "multipart/form-data"
  //   }
  //   await axios.put(url, file, { headers })

  //   const imageUrl = url.split("?")[0]
  //   console.log(imageUrl)
  //   dispatch(captureNewPhoto(imageUrl));
  //   history.push('/postUpload')
  // }

  return (
    <div>
      {/* <form id='imageForm' onSubmit={handleSubmit}> */}
       
   
          <input name="imageInput" type="file" accept="image/*" onChange={(e) => handleChange(e.target)} id="file" className="file" />
          <label htmlFor="file" className='camera-component-div-label'>Capture / Upload </label>
   
     
        {/* <input type='submit' value="Submit" /> */}
      
      {/* </form> */}
      {/* {source.length ? <img src={source} /> : <p>No image uploaded</p>} */}
    </div>
  );
}

export default uploadFile;
