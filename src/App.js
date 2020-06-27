import React, {useRef, useState, useEffect} from 'react';
import landscapeImage from './assets/landscape.gif'
import {sendStartVideoTreckingPixel, sendEndVideoTreckingPixel} from './utils/http';
import {APPLE_STORE_LINK, ANDROID_STORE_LINK, OS_USER_AGENT, VIDEO_SRC} from './utils/constants';
import Button from './components/Button/index.js';
import './App.css';

function App() {
  const videoElement = useRef(null);
  const [btnToRender, setBtnToRender] = useState('start');
  const [orientation, setOrientation] = useState(window.screen.orientation.type)
  useEffect(() => {
    window.addEventListener("resize", () => setOrientation(window.screen.orientation.type));
    sendStartVideoTreckingPixel();
  }, [])
  const returnLinkByUserAgent = () => {
    const currUserAgent = window.navigator.userAgent;
    if (currUserAgent.includes(OS_USER_AGENT)){
      return (APPLE_STORE_LINK);
    }
    return (ANDROID_STORE_LINK);
  }
  const handleStartVideo = () => {
    videoElement.current.play();
    videoElement.current.addEventListener('ended', () => {
      sendEndVideoTreckingPixel();
    })
    videoElement.current.addEventListener('timeupdate', (event) => {
      const currentTime = videoElement.current.currentTime;
      if (currentTime > 4 && currentTime < 5){
        setBtnToRender("spin");
        videoElement.current.pause();
        setTimeout(() => {
          if (videoElement.current.paused){
            setBtnToRender("download");
            videoElement.current.currentTime = 22;
            videoElement.current.play();
          }
        }, 10000)
      }
      if (currentTime > 21 && currentTime < 22){
        setBtnToRender("download");
      }
    });
  }
  const handleStartBtn = () => {
    setBtnToRender("none");
    handleStartVideo();
  }
  const handleSpinBtn = () => {
    setBtnToRender("none");
    videoElement.current.currentTime = 5;
    videoElement.current.play();
  }
  const handleDownloadBtn = () => {
    window.open(returnLinkByUserAgent(),'_blank','resizable=yes');
  }
  const renderBtn = () => {
    if (btnToRender === "start"){
      return <Button handleClickEvent={handleStartBtn} btnType="start" />
    }
    else if (btnToRender === "spin") {
      return <Button handleClickEvent={handleSpinBtn} btnType="spin" />
    }
    else if (btnToRender === "download") {
      return <Button handleClickEvent={handleDownloadBtn} btnType="download" />
    }
    return null;
  }
  return (
    <div className="App">
        {
          orientation.includes("landscape") ?
            <div className="ad-container">
              <video ref={videoElement} id="video-ad" width="100%" height="100%">
                <source src={VIDEO_SRC} type="video/mp4"/>
              </video>
              <div className="btn-conatiner">
                {renderBtn()}
              </div>
            </div>
          :
          <img src={landscapeImage} alt="rotate-youre-phone"/>
        }
    </div>
  );
}

export default App;
