import React, { useEffect, useState } from "react";
import './installpwa.css'

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
      showInstallPromotion();
    };
    window.addEventListener("beforeinstallprompt", handler);

    const timerIn = setTimeout(() => {
        setTimer(true)
    }, 3000)

    const timerOut = setTimeout(() => {
        setTimer(false)
    }, 15000)

    return () => {
        window.removeEventListener("transitionend", handler)
        clearTimeout(timerIn)
        clearTimeout(timerOut)
    }
  }, []);

  const clickHandler = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  return (
    <div id={timer ? "install-bar-active" : "install-bar-inactive"}>
        <div>
            <h5>Haven't installed the app yet? Click this button!</h5>
        </div>
        <button 
            className="button-64" 
            title="Install app" 
            onClick={clickHandler} 
            role="button"
        >
            <span className="text">Install</span>
        </button>
    </div>
  );
};

export default InstallPWA;