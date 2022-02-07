import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AudioSpectrum from "react-audio-spectrum";
import { Link } from "react-router-dom";
const Artists = (artists) => {
  if (artists.length === 1) {
    return <h3>{artists[0]}</h3>;
  } else {
    return (
      <>
        {artists.map((art, index) => {
          <h3 key={index}>{art}</h3>;
        })}
      </>
    );
  }
};
const SongGeneration = () => {
  const setUp = useSelector((state) => {
    console.log(state.song.artist);
    return {
      song: state.song,
      camera: state.camera,
    };
  });
  const {
    song: { artists, preview_url },
  } = setUp;
  // console.log(setUp.song.artists)
  // console.log(artists[0].name)
  const songUrl = setUp.song.preview_url;
  console.log(songUrl);
  return (
    <>
      <h1>Welcome to Song Generation</h1>
      <img className="user-image" src={setUp.camera} />
      <h2 className="song-name">{setUp.song.name}</h2>
      <h3 className="artist-name"></h3>
      <audio
        id="audio-element"
        controls
        autoPlay
        src={songUrl}
        crossOrigin="anonymous"
      />
      <AudioSpectrum
        id="audio-canvas"
        height={300}
        width={1000}
        audioId={"audio-element"}
        capColor={"orange"}
        capHeight={2}
        meterWidth={10}
        meterCount={512}
        meterColor={[
          { stop: 0, color: "#490f77" },
          { stop: 0.5, color: "#C7594B" },
          { stop: 1, color: "orange" },
        ]}
        gap={4}
      />
      <Link to="/home" className="post-camera-links">
        Return Home
      </Link>
    </>
  );
};

export default SongGeneration;
