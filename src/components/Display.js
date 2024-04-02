import React from "react";

const Display = ({ time }) => {
  // Format the time to mm:ss:ms
  const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);

  return (
    <div className="Display">
      {minutes}:{seconds}:{milliseconds}
    </div>
  );
};

export default Display;
