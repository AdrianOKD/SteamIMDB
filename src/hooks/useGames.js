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
