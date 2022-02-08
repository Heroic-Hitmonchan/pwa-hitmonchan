import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { captureNewPhoto } from '../../store/camera';
import axios from 'axios'

function uploadFile() {
  let history = useHistory()
  const [source, setSource] = useState('')
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('e.target:', e.target)
    const file = e.target.imageInput.files[0]
    console.log("file:", file)

    //get secure URL from server
    const {data:url} = await axios.get("api/s3Url")
    console.log(url)

    //post the image directly to the s3 bucket
    const headers = {
      "Content-Type": "multipart/form-data"
    }
    await axios.put(url, file, {headers})

    const imageUrl = url.split("?")[0]
    console.log(imageUrl)
    dispatch(captureNewPhoto(imageUrl));
    history.push('/postUpload')
  }

  return (
    <div>
      <form id='imageForm' onSubmit={handleSubmit}>
          <input name="imageInput" type="file" accept="image/*" onChange={handleChange} />
          <input type='submit' value="Submit" />
      </form>
      {source.length ? <img src={source} /> : <p>No image uploaded</p>}
      </div>
  );
}

export default uploadFile;
