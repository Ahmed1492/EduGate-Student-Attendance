import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      setCurrentTime(formattedTime);
    };

    const timer = setInterval(getCurrentTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{currentTime}</div>;
};

export default Clock;
