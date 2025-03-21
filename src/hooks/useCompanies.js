// useCompanies.js
import { useEffect } from "react";
import axios from "axios";
import useGameStore from "../state/useGameStore";

const useCompanies = () => {
  const {
    companiesCacheInitialized,
    setCompaniesCache,
    setInvolvedCompaniesCache,
    setCompaniesInitialized,
    companiesCache,
    involvedCompaniesCache,
  } = useGameStore((state) => ({
    companiesCacheInitialized: state.companiesCacheInitialized,
    setCompaniesCache: state.setCompaniesCache,
    setInvolvedCompaniesCache: state.setInvolvedCompaniesCache,
    setCompaniesInitialized: state.setCompaniesInitialized,
    companiesCache: state.companiesCache,
    involvedCompaniesCache: state.involvedCompaniesCache,
  }));

  // Effect to initialize the company cache
  useEffect(() => {
    const initializeCompanies = async () => {
      if (companiesCacheInitialized) return;

      try {
        console.log("Initializing companies cache...");

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

        console.log("Companies cache initialized successfully!");
        setCompaniesInitialized(true);
      } catch (error) {
        console.error("Error initializing companies cache:", error.message);
        // You might want to add error handling or retry logic here
      }
    };

    initializeCompanies();
  }, [
    companiesCacheInitialized,
    setCompaniesCache,
    setInvolvedCompaniesCache,
    setCompaniesInitialized,
  ]);

  return {
    initialized: companiesCacheInitialized,
    companiesCount: Object.keys(companiesCache).length,
    involvedCompaniesCount: Object.keys(involvedCompaniesCache).length,
  };
};

export default useCompanies;
