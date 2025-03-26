import { useState, useEffect } from "react";
import useGameStore from "../state/useGameStore";
import axios from "axios";

/**
 * Custom hook for fetching and managing video game data from the IGDB API
 *
 * @param {number} [limit=100] - Maximum number of games to fetch
 * @returns {{games: Array, loading: boolean, error: string|null}} Object containing games data, loading state, and error state
 */
const useGames = (limit = 100) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [games, setGames] = useState([]);
  const setAllGames = useGameStore((state) => state.setAllGames);
  const setGameCompanies = useGameStore((state) => state.setGameCompanies);

  useEffect(() => {
    /**
     * Fetches games data from the IGDB API through the backend server
     * Also fetches and processes related company data (developers and publishers)
     *
     * @async
     * @returns {Promise<void>}
     */
    const fetchGames = async () => {
      try {
        console.log("Starting IGDB API request...");
        setLoading(true);

        const response = await axios.get(
          `http://localhost:3001/api/games?limit=${limit}`
        );

        const fetchedGames = response.data;
        
        setGames(fetchedGames);
        setAllGames(fetchedGames);

        let gameCompanies = {};

        const allInvolvedCompanyIds = fetchedGames.flatMap((game) =>
          game.involved_companies ? game.involved_companies : []
        );

        const uniqueInvolvedCompanyIds = [...new Set(allInvolvedCompanyIds)];

        const validInvolvedCompanyIds = uniqueInvolvedCompanyIds.filter(
          (id) => id !== null && id !== undefined
        );

        console.log("Valid involved company IDs:", validInvolvedCompanyIds);
        console.log("Number of valid IDs:", validInvolvedCompanyIds.length);

        if (validInvolvedCompanyIds.length > 0) {
          // Log for debugging
          console.log(
            "Fetching involved companies with IDs:",
            validInvolvedCompanyIds
          );

          const involvedCompaniesResponse = await axios.get(
            `http://localhost:3001/api/involved-companies?ids=${validInvolvedCompanyIds.join(
              ","
            )}`
          );

          const involvedCompaniesData = involvedCompaniesResponse.data;

          const companyIdsByRole = new Map();
          const companyIds = [];

          involvedCompaniesData.forEach((ic) => {
            if (ic.company) {
              companyIds.push(ic.company);

              if (!companyIdsByRole.has(ic.id)) {
                companyIdsByRole.set(ic.id, {
                  companyId: ic.company,
                  isDeveloper: ic.developer || false,
                  isPublisher: ic.publisher || false,
                });
              }
            }
          });

          const uniqueCompanyIds = [...new Set(companyIds)];

          const companiesResponse = await axios.get(
            `http://localhost:3001/api/companies?ids=${uniqueCompanyIds.join(
              ","
            )}`
          );

          const companiesData = companiesResponse.data;
          console.log("Companies data received - count:", companiesData.length);
          const companyNames = {};
          companiesData.forEach((company) => {
            companyNames[company.id] = company.name;
          });

          fetchedGames.forEach((game) => {
            if (game.involved_companies && game.involved_companies.length > 0) {
              const developers = [];
              const publishers = [];

              game.involved_companies.forEach((icId) => {
                const roleInfo = companyIdsByRole.get(icId);

                if (roleInfo) {
                  const companyName = companyNames[roleInfo.companyId];

                  if (roleInfo.isDeveloper && companyName) {
                    developers.push(companyName);
                  }

                  if (roleInfo.isPublisher && companyName) {
                    publishers.push(companyName);
                  }
                }
              });

              gameCompanies[game.id] = { developers, publishers };
            } else {
              gameCompanies[game.id] = { developers: [], publishers: [] };
            }
          });

          console.log("Game companies mapping:", gameCompanies);
        }

        setGameCompanies(gameCompanies);
        setError(null);
      } catch (err) {
        console.error("Error in fetchGames:", err);
        setError(err.message);
        setGames([]);
        setGameCompanies({});
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [limit, setAllGames, setGameCompanies]);

  return { games, loading, error };
};

export default useGames;
