import { useState, useEffect } from "react";
import useGameStore from "../state/useGameStore";
import axios from "axios";

const useGames = (limit = 100) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [games, setGames] = useState([]);
  const setAllGames = useGameStore((state) => state.setAllGames);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log("Starting IGDB API request...");
        setLoading(true);

        // This would call your backend endpoint that handles IGDB authentication
        const response = await axios.get(
          `http://localhost:3001/api/games?limit=${limit}`
        );

        // Assuming your backend returns the shaped data directly
        const fetchedGames = response.data;
        setGames(fetchedGames);
        setAllGames(fetchedGames);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [limit], [setAllGames]);

  return { games, loading, error };
};

export default useGames;

/* OLD VERSION
import { useState, useEffect } from "react";
import useGameStore from "../state/useGameStore";
import axios from "axios";

const useGames = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [games, setGames] = useState([]);
  const setAllGames = useGameStore((state) => state.setAllGames);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log("Starting API request in useGames...");
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/steam/apps"
        );
        const fetchedGames = response.data.applist.apps;
        setGames(fetchedGames);
        // Update the global state with the fetched games
        setAllGames(fetchedGames);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [setAllGames]); // Add setAllGames to dependency array
  console.log(games);
  return { games, loading, error };
};

export default useGames;
*/
