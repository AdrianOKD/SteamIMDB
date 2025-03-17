// src/hooks/useSteamApp.js
import { useState, useEffect } from "react";
import axios from "axios";

const useSteamApp = (appId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        setLoading(true);
        // Use our proxy server instead of directly calling Steam
        const response = await axios.get(
          `http://localhost:3001/api/steam/app/${appId}`
        );
        setAppData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAppData(null);
      } finally {
        setLoading(false);
      }
    };

    if (appId) {
      fetchAppData();
    }
  }, [appId]);

  return { loading, error, appData };
};

export default useSteamApp;
