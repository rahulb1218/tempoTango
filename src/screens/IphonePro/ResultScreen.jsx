import React from "react";
import arrowIcon from "/static/img/arrow.svg"

const ResultScreen = ({ animationClass, handleContinueClick, scoreAdded,
trackBPM, inputBPM, response, responseColor }) => {
    return (
        <>
            <div className={`screen ${animationClass}`}>
                <div className="result-screen">
                    <div className="div">
                        <button className="continueButton" onClick={handleContinueClick}>
                            <img className="arrow-icon" alt="Arrow icon" src={arrowIcon} />
                        </button>
                        <div style={{ color: responseColor }}
                        className="score-change">+{scoreAdded}</div>
                        <div style={{ color: responseColor }} 
                        className="score-response">{response}</div>
                        <div className="bpmSection">
                        <div style={{ color: responseColor }} 
                        className="your-BPM">Your BPM: {inputBPM}</div>
                        <div className="track-BPM">Track BPM: {trackBPM}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultScreen;