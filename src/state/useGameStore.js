import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Create a store to manage game selection
const useGameStore = create(
  persist(
    (set) => ({
      allGames: [],
      selectedScreenshotsAll: [],
      selectedScreenshotsCurrent: [],
      selectedMainScreenshot: null,
      carouselIndex: null,
      gameCompanies: {},
      selectedGame: [],

      /**
       * Updates the store with games from the API.
       * @param {Array} games - Array of game objects with properties like id, name, etc.
       */
      setAllGames: (games) =>
        set({
          allGames: games.map((game) => game),
        }),

      /**
       * Updates the store with a specific game based on the id parameter.
       * @param {Array} games - Array of game objects with properties like id, name, etc.
       * @param {string} id - The unique id of the selected game.
       */
      selectGame: (games, id) =>
        set((state) => {

          const game = games.find((game) => game.id == id);

          let chunkedScreenshots = [];

          if (game?.screenshots && game.screenshots.length > 0) {

            const processedScreenshots = game.screenshots.map((screenshot) =>
              screenshot.url.replace("t_thumb", "t_1080p")
            );

            for (let i = 0; i < processedScreenshots.length; i += 6) {
              chunkedScreenshots.push(processedScreenshots.slice(i, i + 6));
            }
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
       * Updates the store with the currently selected main screenshot.
       * @param {string} url - The url of the selected screenshot.
       */
      selectMainScreenshot: (url) =>
        set({
          selectedMainScreenshot: url,
        }),

      /**
       * Updates the store with the currently selected screenshots.
       *  @param {number} index - Index for selecting current array of screenshots.
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
              selectedMainScreenshot: state.selectedScreenshotsAll[tempCarouselIndex][0],
              selectedScreenshotsCurrent: state.selectedScreenshotsAll[tempCarouselIndex],
            };
          }
          return {
            ...state,
          };
        }),

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
      name: "game-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGameStore;
