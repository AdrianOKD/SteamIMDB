import { Grid2 } from "@mui/material";
import useGameStore from "../../state/useGameStore";
import { GameCard } from "./GameCard";
import "/src/Css/frontpage/GameGrid.css";

/**
 * @typedef {Object} Game
 * @property {string} id - Unique identifier for the game
 * @property {string} [imageUrl] - Optional URL to the game's image
 */

/**
 * @module GameGrid
 * @description Component Displays a responsive grid of game cards fetched from the game store.
 * The grid adapts to different screen sizes with appropriate spacing and column counts.
 *
 * @returns {JSX.Element} A grid containing GameCard components
 */
export function GameGrid() {
  /** @type {Game[]} - Array of games from the global state */
  const games = useGameStore((state) => state.allGames);

  return (
    <div className="gg-div" width="70%" flex={1}>
      <Grid2
        className="game-grid"
        container
        spacing={{ xs: 2, md: 3, lg: 5, xl: 8 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 15 }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Grid2>
    </div>
  );
}
