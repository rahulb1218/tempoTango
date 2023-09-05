import React from "react";

import playIcon from "/static/img/solar-play-bold.svg"; 
import replayIcon from "/static/img/replay.svg"
import arrowIcon from "/static/img/arrow.svg"
const GameScreen = ({ animationClass, handleSubmitClick, handleBlur, handleFocus,
     isInputFocused, currentTrackNumber, totalScore, handleInputChange, albumCover,
    currentArtist, currentTrackName, handlePlayTrackClick, previewURL}) => {
    return (
        <div className={`screen ${animationClass}`}>
        <div className="iphone-pro">
          
        <div className="div">
          <div className="controls">
          <audio id="audioPlayer" controls style={{ display: 'none' }}>
          
            <source src={previewURL} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
            {/* <div className="insideControls"> */}
              <div className="insideControlsRight">
                <button className="submitButton" onClick={handleSubmitClick}>
                    <img className="submitArrow" alt="Maki arrow" src={arrowIcon} />
                </button>
                
                <input
                    type="text"
                    placeholder="ex: 90"
                    className={`${isInputFocused ? "centered-input" : ""} answerBox`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    inputMode="numeric"
                    onChange={handleInputChange}
                />
                {isInputFocused && <div className="blur-overlay"></div>}
                <button className="playTrackButton" onClick={handlePlayTrackClick}>
                <img className="playTrackIcon" alt="Solar play bold" src={playIcon} />
                </button>
                
              </div>
              <div className="bpmLabel">BPM:</div>
              <div className="trackName">{currentTrackName}</div>
              <div className="artist">{currentArtist}</div>
              <button className="replayButton" onClick={handlePlayTrackClick}>
                <img className="replayIcon" alt="Material symbols" src={replayIcon} />
              </button>
            {/* </div> */}
            
          </div>
          <img className="albumCover" alt="album cover image" src={albumCover} />
          <div className="topBar">
            <div className="trackNumber">Track: {currentTrackNumber}/10</div>
            <div className="score">Score: {totalScore}</div>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default GameScreen;