import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Create a store to manage game selection
const useGameStore = create(
  persist(
    (set) => ({
      // Store all game IDs fetched from Steam API
      allGames: [],

      // Store randomly selected game IDs (100 games)
      selectedGameIds: [],

      selectedScreenshotsAll: [],

      selectedScreenshotsCurrent: [],

      selectedMainScreenshot: null,

      carouselIndex: null,

      gameCompanies: {},

      // Store currently displayed games
      selectedGame: [],

      /**
       * Updates the store with games from the API.
       * @param {Array} games - Array of game objects with properties like id, name, etc.
       */
      setAllGames: (games) =>
        set({
          // Extract just the IDs or use the full game objects as needed
          allGames: games.map((game) => game),
        }),

      /**
       * Updates the store with a specific game based on the id parameter.
       * @param {Array} games - Array of game objects with properties like id, name, etc.
       * @param {string} id - The unique id of the selected game.
       */
      selectGame: (games, id) =>
        set((state) => {
          // First find the game
          const game = games.find((game) => game.id == id);

          // Process screenshots if they exist
          let chunkedScreenshots = [];

          if (game?.screenshots && game.screenshots.length > 0) {
            // First transform the URLs as needed
            const processedScreenshots = game.screenshots.map((screenshot) =>
              screenshot.url.replace("t_thumb", "t_1080p")
            );

            // Now chunk them into groups of 6
            // Option 1: Using a loop
            for (let i = 0; i < processedScreenshots.length; i += 6) {
              chunkedScreenshots.push(processedScreenshots.slice(i, i + 6));
            }

            // Alternative approach with reduce (more concise but harder to read)
            // chunkedScreenshots = processedScreenshots.reduce((resultArray, item, index) => {
            //   const chunkIndex = Math.floor(index / 6);
            //   if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
            //   resultArray[chunkIndex].push(item);
            //   return resultArray;
            // }, []);
          }

          return {
            selectedGame: game,
            selectedScreenshotsAll: chunkedScreenshots,
            selectedScreenshotsCurrent: chunkedScreenshots[0],
            selectedMainScreenshot: null,
            carouselIndex: 0,
          };
        }),

      /**
       * Updates the store
       *
       *
       */
      selectMainScreenshot: (url) =>
        set({
          selectedMainScreenshot: url,
        }),

      /**
       * Updates the store
       *
       *
       */
      selectScreenshotsCurrent: (index) =>
        set((state) => {
          const tempCarouselIndex = state.carouselIndex + index;
          if (
            tempCarouselIndex < state.selectedScreenshotsAll.length &&
            tempCarouselIndex >= 0
          ) {
            return {
              ...state,
              carouselIndex: tempCarouselIndex,
              selectedMainScreenshot:
                state.selectedScreenshotsAll[tempCarouselIndex][0],
              selectedScreenshotsCurrent:
                state.selectedScreenshotsAll[tempCarouselIndex],
            };
          }
          return {
            ...state,
          };
        }),
      // selectScreenshots: (game) =>
      //   set({
      //     selectedScreenshots: game.screenshots.url.map((screenshotUrl) => screenshotUrl.replace("t_thumb", "t_1080p"))
      //   }),

      /**
       * Updates the store with developer and publisher information for games
       * @param {Object} companies - Object mapping game IDs to their developer and publisher information
       * @param {Object} companies[gameId] - Developer and publisher information for a specific game
       * @param {string[]} companies[gameId].developers - Array of developer company names
       * @param {string[]} companies[gameId].publishers - Array of publisher company names
       */
      setGameCompanies: (companies) =>
        set({
          gameCompanies: companies,
        }),
    }),
    {
      name: "game-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGameStore;
