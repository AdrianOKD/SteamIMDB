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
      set({
        selectedGame: games.find((game) => game.id == id),
      }),

    // Set displayed games (could be a subset of the selected games)
    setDisplayedGames: (games) =>
      set({
        displayedGames: games,
      }),

    // Select a specific number of random games from the selected 100 to display
  }))
);

export default useGameStore;
