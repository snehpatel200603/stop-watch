import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Controls from "./components/Controls";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent default spacebar behavior (e.g. page scrolling)
        if (!isActive) {
          handleStart();
        } else {
          handlePauseResume();
        }
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, isPaused]); // Dependencies for the effect

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setIsPaused(true);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="App">
      <Display time={time} />
      <Controls
        isActive={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleLap={handleLap}
      />
      <div className="LapTimes">
        {laps.length > 0 && (
          <ul className="LapList">
            {laps.map((lap, index) => {
              // Format the lap time
              const minutes = ("0" + Math.floor((lap / 60000) % 60)).slice(-2);
              const seconds = ("0" + Math.floor((lap / 1000) % 60)).slice(-2);
              const milliseconds = ("0" + ((lap / 10) % 100)).slice(-2);

              return (
                <li key={index}>
                  Lap {index + 1}: {minutes}:{seconds}:{milliseconds}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
