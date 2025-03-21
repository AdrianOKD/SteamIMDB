import { useEffect } from "react";
import axios from "axios";
import useGameStore from "../state/useGameStore";

const useCompanies = () => {
  // Use primitive values rather than selector functions in your state extraction
  const companiesCacheInitialized = useGameStore(
    (state) => state.companiesCacheInitialized
  );
  const setCompaniesCache = useGameStore((state) => state.setCompaniesCache);
  const setInvolvedCompaniesCache = useGameStore(
    (state) => state.setInvolvedCompaniesCache
  );
  const setCompaniesInitialized = useGameStore(
    (state) => state.setCompaniesInitialized
  );

  // Only access these if needed for the return value
  const companiesCache = useGameStore((state) => state.companiesCache);
  const involvedCompaniesCache = useGameStore(
    (state) => state.involvedCompaniesCache
  );

  useEffect(() => {
    // Only run this if we haven't initialized yet
    if (companiesCacheInitialized) return;

    const initializeCompanies = async () => {
      try {
        console.log("🏢 Initializing companies cache...");

        // Fetch involved companies data
        const involvedCompaniesResponse = await axios.get(
          "http://localhost:3001/api/involved-companies"
        );
        setInvolvedCompaniesCache(involvedCompaniesResponse.data);

        // Fetch companies data
        const companiesResponse = await axios.get(
          "http://localhost:3001/api/companies"
        );
        setCompaniesCache(companiesResponse.data);

        console.log("🏢 Companies cache initialized successfully!");
        setCompaniesInitialized(true);
      } catch (error) {
        console.error("🏢 Error initializing companies cache:", error.message);
      }
    };

    initializeCompanies();
    // Only include primitive values in this dependency array
  }, [companiesCacheInitialized]);

  return {
    initialized: companiesCacheInitialized,
    companiesCount: Object.keys(companiesCache).length,
    involvedCompaniesCount: Object.keys(involvedCompaniesCache).length,
  };
};

export default useCompanies;
