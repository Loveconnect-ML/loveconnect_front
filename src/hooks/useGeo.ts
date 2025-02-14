import { useState, useEffect, useLayoutEffect } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeo = (options = {}) => {
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useLayoutEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};
