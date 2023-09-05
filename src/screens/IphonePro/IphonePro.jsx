import React, { useState, useEffect } from "react";
import TitleScreen from "./TitleScreen";
import RulesScreen from "./RulesScreen";
import GameScreen from "./GameScreen";
import ResultScreen from "./ResultScreen";
import FinalScreen from "./FinalScreen";
import albumCoverExample  from "/static/img/albumExample.jpeg";
import "./style.css";

export const IphonePro = () => {
  const [currentScreen, setCurrentScreen] = useState("title");
  const [animationClass, setAnimationClass] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [scoreAdded, setScoreAdded] = useState(0);
  const [trackBPM, setTrackBPM] = useState(94);
  const [inputBPM, setInputBPM] = useState(0);
  const [currentTrackNumber, setCurrentTrackNumber] = useState(1)
  const [response, setResponse] = useState("");
  const [responseColor, setResponseColor] = useState('');
  const [loggedIn, setLoggedIn] = useState("false");
  const [redirectUri, setRedirectUri] = useState("http://10.0.0.16:1234/");
  const [accessToken, setAccessToken] = useState('');
  const [clientId, setClientId] = useState('4023e24cbd304677ac3cadebdae4e76a');
  const [clientSecret, setClientSecret] = useState('2cc869afe64442e89778a13175087748');
  const [albumCover, setAlbumCover] = useState(albumCoverExample);
  const [currentTrackID, setCurrentTrackID] = useState('');
  const [currentTrackName, setCurrentTrackName] = useState('');
  const [currentArtist, setCurrentArtist] = useState('');
  const [previewURL, setPreviewURL] = useState('');


  useEffect(() => {
    checkLogIn();
  }, []);

  const getTrackBPM = (accessToken, trackID) => {
    return fetch(`https://api.spotify.com/v1/audio-features/${trackID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Get the tempo from the audio features response
        const tempo = data.tempo;
        const roundedTempo = Math.round(tempo); // Round the tempo to a whole number
        setTrackBPM(roundedTempo);
        console.log("Track tempo (rounded):", roundedTempo);
  
        return roundedTempo;
      })
      .catch((error) => {
        console.error("Error getting tempo:", error);
        return null;
      });
  };
  

  const getTrackMeta = (accessToken, trackID) => {

    return fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Get the URL of the first image in the album's images array
        console.log("here is track ID:")
        console.log(trackID);
        console.log("endID and data:")
        console.log(data);
        const albumImage = data.album.images[0].url;
        setAlbumCover(albumImage); // Set the state with the fetched album image URL

        const name = data.name;
        setCurrentTrackName(name);
        console.log("track name: " + name);


        const artists = data.artists;
        const artistNames = artists.map((artist) => artist.name);
        setCurrentArtist(artistNames[0]);
        console.log("artist: " + artistNames);

        const pURL = data.preview_url;
        setPreviewURL(pURL);
        console.log("preview URL: " + pURL);

        return albumImage;
      })
      .catch((error) => {
        console.error("Error getting album cover image:", error);
        return null;
      });
  };
  
  const handlePlayTrackClick = () => {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    console.log("should be playing");
  }

  const handleLoginClick = () => {
    setAnimationClass("slide-enter");
    // //const redirectUri = 'google.com';
    const scopes = 'user-read-private user-read-email'; // List of requested permissions
    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code`;
    
    
    setLoggedIn("true");
    localStorage.setItem("loggedIn", loggedIn);

    window.location.href = authorizationUrl;
  }

  const checkLogIn = () => {
    if(localStorage.getItem("accessToken") !== null){
      setAccessToken(localStorage.getItem("accessToken"));
      console.log("the state accessToken on page reload is set to " + localStorage.getItem("accessToken"))
    }
    if(localStorage.getItem("loggedIn") === "false"){
      setCurrentScreen("rules");
    }
    else{
      setCurrentScreen("title")
    }
    console.log(localStorage.getItem("loggedIn"));
  }

  const getTrackID = (gotAccessToken, playlistId) => {
    //const accessToken = localStorage.getItem("accessToken");
  
    // Make a GET request to the Spotify API to get the playlist tracks
    console.log("getTrackID is using the token: " + gotAccessToken);
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${gotAccessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // Check if the response contains the 'items' array
        if (data.items && data.items.length > 0) {
          // Choose a random track from the playlist
          const randomIndex = Math.floor(Math.random() * data.items.length);
          const randomTrack = data.items[randomIndex];
  
          // Extract the track ID from the selected track object
          const trackId = randomTrack.track.id;
  
          console.log("Random Track ID:", trackId);
          setCurrentTrackID(trackId);
          return trackId;
        } else {
          console.log("No tracks found in the playlist.");
          return 0;
        }
      })
      .catch(error => {
        console.error("Error getting playlist tracks:", error);
      });
};

  


  // const checkAccessTokenValidity = (accessToken) => {
  //   return fetch("https://api.spotify.com/v1/me", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // If the request is successful, the access token is valid
  //       return true;
  //     })
  //     .catch((error) => {
  //       // If the request fails, the access token might be invalid or expired
  //       return false;
  //     });
  // };
  
  const getAccessToken = () => {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('accessToken') !== null) {
        // If the access token is already in localStorage, resolve with it.
        resolve(localStorage.getItem('accessToken'));
      } else {
        const url = new URL(window.location.href);
        const authorizationCode = url.searchParams.get('code');
  
        const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  
        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', 'authorization_code');
        requestBody.append('code', authorizationCode);
        requestBody.append('redirect_uri', redirectUri);
        requestBody.append('client_id', clientId);
        requestBody.append('client_secret', clientSecret);
  
        fetch(tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: requestBody.toString(),
        })
          .then(response => response.json())
          .then(data => {
            const access_token = data.access_token;
            console.log('Access Token:', access_token);
            setAccessToken(access_token);
            localStorage.setItem('accessToken', access_token);
            resolve(access_token); // Resolve the promise with the access token.
          })
          .catch(error => {
            console.error('Error exchanging code for token:', error);
            reject(error); // Reject the promise with the error.
          });
      }
    });
  };

  const handlePlayGameClick = async () => {
    
    // if(localStorage.getItem('accessToken') === null){
    //   const url = new URL(window.location.href);
    //   const authorizationCode = url.searchParams.get('code');

    //   const tokenEndpoint = 'https://accounts.spotify.com/api/token';

    //   const requestBody = new URLSearchParams();
    //   requestBody.append('grant_type', 'authorization_code');
    //   requestBody.append('code', authorizationCode);
    //   requestBody.append('redirect_uri', redirectUri);
    //   requestBody.append('client_id', clientId);
    //   requestBody.append('client_secret', clientSecret);

    //   fetch(tokenEndpoint, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: requestBody.toString(),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       const access_token = data.access_token;
    //       console.log('Access Token:', access_token);
    //       setAccessToken(access_token);
    //       localStorage.setItem('accessToken', access_token);
    //       setAccessToken(access_token)
    //     })
    //     .catch(error => {
    //       console.error('Error exchanging code for token:', error);
    //     });
    //   };
    
    // checkAccessTokenValidity(accessToken).then((isValid) => {
    // if (isValid) {
    //   console.log("Access token is valid");
    // } else {
    //   console.log("Access token is invalid or expired");
    // }
    // });




    // getTrackID('37i9dQZEVXbLRQDuF5jeBp')
    // .then((currentTrackID) => {
    //   console.log("passing trackID: " + currentTrackID);
    //   getTrackBPM(accessToken, currentTrackID);
    //   return getTrackMeta(accessToken, currentTrackID);
    // })
    // .then(() => {
    //   setAnimationClass("slide-enter");
    //   setCurrentScreen("game");
    // });

    const tempToken = await getAccessToken();
    console.log("return: " + tempToken);

    const currentTrackID = await getTrackID(tempToken,'37i9dQZEVXbLRQDuF5jeBp');
    console.log("passing trackID:", currentTrackID);

    const trackBPM = await getTrackBPM(tempToken, currentTrackID);
    const trackMeta = await getTrackMeta(tempToken, currentTrackID);

    console.log("Track BPM:", trackBPM);
    console.log("Track Meta:", trackMeta);

    setAnimationClass("slide-enter");
    setCurrentScreen("game");
    

    
  };

  const handleInputChange = (event) => {
    setInputBPM(event.target.value);
  };

  const getGradientColor = (value) => {
    const normalizedValue = (value - 5) / 15;
    const hue = 60 - normalizedValue * 60;
  
    return `hsl(${hue}, 100%, 50%)`;
  };
  

  const handleSubmitClick = () => {
    console.log("submitting");
    setAnimationClass("slide-enter");

    const scoreDifference = Math.abs(trackBPM - inputBPM);
    setScoreAdded(scoreDifference);
    console.log("totalScore = " + totalScore + " + " + scoreAdded + " = ");

    setTotalScore(prevTotalScore => prevTotalScore + scoreDifference);
    console.log(totalScore);

    if (scoreDifference < 5) {
      setResponse("Woah! Great Job!");
      setResponseColor('hsl(147, 76%, 47%)');
    } else if (scoreDifference < 10) {
      setResponse("So close!");
      setResponseColor(getGradientColor(scoreDifference)); 
    } else if (scoreDifference < 20) {
      setResponse("You could use some practice!");
      setResponseColor(getGradientColor(scoreDifference)); 
    } else {
      setResponse("You could use some practice!");
      setResponseColor('hsl(0, 100%, 50%)');
    }


    
     
    setCurrentScreen("result");
  };

  const handleContinueClick = async () => {
    setCurrentScreen("blank");

    const currentTrackID = await getTrackID(accessToken, '37i9dQZEVXbLRQDuF5jeBp');
    console.log("passing trackID:", currentTrackID);

    const trackBPM = await getTrackBPM(accessToken, currentTrackID);
    const trackMeta = await getTrackMeta(accessToken, currentTrackID);

    console.log("Track BPM:", trackBPM);
    console.log("Track Meta:", trackMeta);


    setAnimationClass("slide-enter");
    if(currentTrackNumber === 10){
      setCurrentScreen("final");
    }
    else{
      setCurrentScreen("game");
    }
    setCurrentTrackNumber(currentTrackNumber + 1)
    setInputBPM(0);
  }

  const handleRestartGameClick = () => {
    setAnimationClass("slide-enter");

    setTotalScore(0);
    setCurrentScreen(1);

    setCurrentScreen("title");

  }

  // const handleAnimationEnd = () => {
  //   setAnimationClass("");
  // };

  const handleFocus = () => {
    setIsInputFocused(true);

  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const renderScreen = () => {
   
    //setLoggedIn(false);
    if (currentScreen === "title") {
      return <TitleScreen animationClass={animationClass} handleLoginClick={handleLoginClick} />;

    } else if (currentScreen === "rules") {
      return <RulesScreen animationClass={animationClass} handlePlayGameClick={handlePlayGameClick} />;

    } else if (currentScreen === "game") {
      return <GameScreen animationClass={animationClass} handleSubmitClick={handleSubmitClick} 
      handleBlur={handleBlur} handleFocus={handleFocus} isInputFocused={isInputFocused}
      currentTrackNumber={currentTrackNumber} totalScore={totalScore} 
      handleInputChange={handleInputChange} albumCover={albumCover} currentArtist={currentArtist}
      currentTrackName={currentTrackName} handlePlayTrackClick={handlePlayTrackClick} 
      previewURL={previewURL}/>;

    } else if (currentScreen === "result") {
      return <ResultScreen animationClass={animationClass} handleContinueClick={handleContinueClick} 
      scoreAdded={scoreAdded} trackBPM={trackBPM} inputBPM={inputBPM} response={response} 
      responseColor={responseColor}/>;
      
    } else if (currentScreen === "final") {
      return <FinalScreen animationClass={animationClass} handleRestartGameClick={handleRestartGameClick} 
      totalScore={totalScore}/>;
    } else if (currentScreen === "blank") {
      return <div></div>
    }
    
  };

  return (
    <div className="iphone-pro">
      <div className="div">
        {renderScreen()}
      </div>
    </div>
  );
};
