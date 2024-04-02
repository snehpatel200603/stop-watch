import React from "react";

const Controls = ({
  isActive,
  isPaused,
  handleStart,
  handlePauseResume,
  handleReset,
  handleLap,
}) => {
  return (
    <div className="Controls">
      {!isActive && <button onClick={handleStart}>Start</button>}
      {isActive && isPaused && (
        <button onClick={handlePauseResume}>Resume</button>
      )}
      {isActive && !isPaused && (
        <button onClick={handlePauseResume}>Pause</button>
      )}
      <button onClick={handleReset}>Reset</button>
      {isActive && (
        <button className="lap" onClick={handleLap}>
          Lap
        </button>
      )}
    </div>
  );
};

export default Controls;
