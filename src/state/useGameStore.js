import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create a store to manage game selection
const useGameStore = create(
  persist((set) => ({
    // Store all game IDs fetched from Steam API
    allGames: [],

    // Store randomly selected game IDs (100 games)
    selectedGameIds: [],

    selectedGameImages: [],

    selectedModalScreenshot: [],

    selectedScreenshots: [],

    selectedMainScreenshot: null,

    // Store currently displayed games
    selectedGame: [],

    // Set all available games from API
    setAllGames: (games) =>
      set({
        // Extract just the IDs or use the full game objects as needed
        allGames: games.map((game) => game),
      }),

    selectGameImages: (games) =>
      set({
        selectedGameImages: games.map((game) =>
          game.cover.url.replace("t_thumb", "t_cover_big")
        ),
      }),

    selectGame: (games, id) =>
      set((state) => {
        // First find the game
        const game = games.find((game) => game.id == id);

        // Then return the new state object with both the selected game
        // and its screenshots processed
        return {
          selectedGame: game,
          selectedScreenshots:
            game?.screenshots?.map((screenshot) =>
              screenshot.url.replace("t_thumb", "t_1080p")
            ) || [],
          selectedMainScreenshot: null,
        };
      }),

    // Set displayed games (could be a subset of the selected games)
    setDisplayedGames: (games) =>
      set({
        displayedGames: games,
      }),

    selectModalScreenshot: (url) =>
      set({
        selectedModalScreenshot: url,
      }),

    selectMainScreenshot: (url) =>
      set({
        selectedMainScreenshot: url,
      }),
    // selectScreenshots: (game) =>
    //   set({
    //     selectedScreenshots: game.screenshots.url.map((screenshotUrl) => screenshotUrl.replace("t_thumb", "t_1080p"))
    //   }),

    // Select a specific number of random games from the selected 100 to display

    // New caching for companies
    companiesCache: {},
    involvedCompaniesCache: {},
    companiesCacheInitialized: false,

    // Existing methods
    setAllGames: (games) => set({ allGames: games }),
    setSelectedGame: (game) => set({ selectedGame: game }),

    // New methods for company caching
    setCompaniesCache: (companies) => {
      const companiesMap = {};
      companies.forEach((company) => {
        companiesMap[company.id] = company;
      });
      set({ companiesCache: companiesMap });
    },

    setInvolvedCompaniesCache: (involvedCompanies) => {
      const involvedCompaniesMap = {};
      involvedCompanies.forEach((ic) => {
        involvedCompaniesMap[ic.id] = ic;
      });
      set({ involvedCompaniesCache: involvedCompaniesMap });
    },

    setCompaniesInitialized: (value) =>
      set({ companiesCacheInitialized: value }),

    // Helper method to get developers and publishers for a specific game
    getCompaniesForGame: (gameId) => {
      const state = get();
      const game = gameId
        ? state.allGames.find((g) => g.id === gameId)
        : state.selectedGame;

      if (!game || !game.involved_companies)
        return { developers: [], publishers: [] };

      const developers = [];
      const publishers = [];

      game.involved_companies.forEach((icId) => {
        const involvedCompany = state.involvedCompaniesCache[icId];
        if (!involvedCompany) return;

        const company = state.companiesCache[involvedCompany.company];
        if (!company) return;

        if (involvedCompany.developer) developers.push(company);
        if (involvedCompany.publisher) publishers.push(company);
      });

      return { developers, publishers };
    },
  }))
);

export default useGameStore;
