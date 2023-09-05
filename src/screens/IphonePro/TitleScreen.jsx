import React from "react";
import spotifyIcon from "/static/img/spotifyicon-1.png"; 

const TitleScreen = ({ animationClass, handleLoginClick }) => {
  return (
    <div className={`screen ${animationClass}`}>
      <div>
        <div className="text-wrapper">Tempo Tango</div>
        <p className="p">The tempo training game for DJs</p>
        <button className="bigButton" onClick={handleLoginClick}>
          <div className="text-wrapper-2">Log in with Spotify</div>
          <img className="spotifyicon" alt="Spotifyicon" src={spotifyIcon} />
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;
