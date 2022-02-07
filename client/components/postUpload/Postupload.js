import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useColorThief from 'use-color-thief'
import { captureNewPhoto } from '../../store/camera';
import colorSort from '../../store/colorSort'
// const source = 'https://jins-test-aws-bucket-react.s3.us-west-2.amazonaws.com/1643928379998'

function postUpload() {
  
  let [playlist, setPlaylist] = useState('')

  const source = useSelector((state) => {
      return state.camera;
  });

  const {palette} = useColorThief(source, {
    format: 'rgb',
    colorCount: 10,
    quality: 1,
  })

  useEffect(() => {
    if (palette) {
      console.log("palette:", palette[0])
      setPlaylist(colorSort(palette[0]))
    }
  }, [palette])

  return (
    <div>
      {playlist.length ? <div>{playlist}</div> : <div>Loading...</div>}
    </div>
  );
}

export default postUpload;
