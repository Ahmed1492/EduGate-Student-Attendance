import React, { createContext, useEffect, useState } from "react";

// Create the context outside of the component
export const LocationTimeContext = createContext();

export const LocationTimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentLocation, setCurrentLocation] = useState(false);

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: "", lng: "" }, // Reset or keep the old coordinates
      error: error,
    });
  };

  const getCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    console.log("Get Current place");
  }, [currentLocation]);

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

  return (
    <LocationTimeContext.Provider
      value={{ location, currentTime, setCurrentLocation, currentLocation }}
    >
      {children}
    </LocationTimeContext.Provider>
  );
};
