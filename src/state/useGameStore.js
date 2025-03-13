import { create } from "zustand";

// Create a store to manage game selection
const useGameStore = create((set) => ({
  // Store all game IDs fetched from Steam API
  allGameIds: [],

  // Store randomly selected game IDs (100 games)
  selectedGameIds: [],

  // Store currently displayed games
  displayedGames: [],

  // Set all available games from API
  setAllGames: (games) =>
    set({
      // Extract just the IDs or use the full game objects as needed
      allGameIds: games.map((game) => game.appid || game.id),
    }),

  // Randomly select 100 games from the full list
  selectRandomGames: () =>
    set((state) => {
      // Make a copy of all game IDs to avoid modifying the original array
      const gamePool = [...state.allGameIds];
      const selected = [];

      // Select 100 random games, or all games if fewer than 100 are available
      const selectionCount = Math.min(100, gamePool.length);

      for (let i = 0; i < selectionCount; i++) {
        // Get a random index
        const randomIndex = Math.floor(Math.random() * gamePool.length);

        // Add the randomly selected game to our selection
        selected.push(gamePool[randomIndex]);

        // Remove the selected game from the pool to avoid duplicates
        gamePool.splice(randomIndex, 1);
      }

      return { selectedGameIds: selected };
    }),

  // Set displayed games (could be a subset of the selected games)
  setDisplayedGames: (games) =>
    set({
      displayedGames: games,
    }),

  // Select a specific number of random games from the selected 100 to display
  displayRandomGames: (count) =>
    set((state) => {
      if (state.selectedGameIds.length === 0) return { displayedGames: [] };

      // Make a copy of selected game IDs
      const gamePool = [...state.selectedGameIds];
      const toDisplay = [];

      // Determine how many games to display (can't exceed available games)
      const displayCount = Math.min(count, gamePool.length);

      for (let i = 0; i < displayCount; i++) {
        const randomIndex = Math.floor(Math.random() * gamePool.length);
        toDisplay.push(gamePool[randomIndex]);
        gamePool.splice(randomIndex, 1);
      }

      return { displayedGames: toDisplay };
    }),
}));

export default useGameStore;
