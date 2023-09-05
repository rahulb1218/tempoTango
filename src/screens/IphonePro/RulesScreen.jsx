import React from "react";
import playIcon from "/static/img/solar-play-bold.svg"; 

const RulesScreen = ({ animationClass, handlePlayGameClick }) => {
  return (
    <div className={`screen ${animationClass}`}>
      <div>
        <div className="ruleHeading">Rules:</div>
        <p className="rules">
          1. A song preview will play and you will enter what you think the BPM of the song is
          <br />
          2. The farther you are from the correct BPM, the more “points” you will accrue
          <br />
          3. The lower your points, the better your performance
        </p>
        <button className="bigButton" id="spotifyGreen" onClick={handlePlayGameClick}>
          <img className="playButtonMain" alt="Solar play bold" src={playIcon} />
        </button>
      </div>
    </div>
  );
};

export default RulesScreen;
