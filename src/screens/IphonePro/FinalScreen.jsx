import React from "react";
import "./style.css";
import replayIcon from "/static/img/replay.svg"

const FinalScreen = ({ animationClass, handleRestartGameClick, totalScore }) => {
  return (
    <div className={`screen ${animationClass}`}>
    <div className="final-screen">
      <div className="div">
        <button className="replayGameButton" onClick={handleRestartGameClick}>
          <img className="replay-game-icon" alt="Replay game icon" src={replayIcon} />
        </button>
        <div className="final-score">{totalScore}</div>
        <div className="final-score-label">Final Score:</div>
        <p className="play-again-message">Tap below to play again!</p>
      </div>
    </div>
    </div>
  );
};

export default FinalScreen;
