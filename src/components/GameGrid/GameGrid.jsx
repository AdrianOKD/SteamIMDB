import { Container, Paper, Grid2, Box } from "@mui/material";
import useGameStore from "../../state/useGameStore";
import logo from "/src/components/assets/company-logo.png";
import { GameCard } from "./Gamecard";
import "/src/Css/gamegrid/GameGrid.css";

export function GameGrid() {
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