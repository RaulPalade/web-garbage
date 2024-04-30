import { useEffect, useState } from "react";

export function useGoogleMapsAPIKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [mapId, setMapId] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const mapId = process.env.REACT_APP_GOOGLE_MAPS_ID_KEY;

    if (apiKey) {
      setApiKey(apiKey);
    } else {
      console.error("Google Maps API key not found in environment variables.");
    }

    if (mapId) {
      setMapId(mapId);
    } else {
      console.error("Google Maps Map ID not found in environment variables.");
    }
  }, []);

  return { apiKey, mapId };
}
