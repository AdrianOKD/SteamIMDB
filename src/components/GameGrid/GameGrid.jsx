import { Container, Paper, Grid2, Box } from "@mui/material";
import logo from "/src/components/assets/company-logo.png";
import { GameCard } from "./Gamecard";
import "/src/Css/gamegrid/GameGrid.css";

export function GameGrid() {
  const games = ["440", "3445120", "814380", "3352070", "730"];
  return (
    <div className="gg-div" width="70%" flex={1}>
      <Grid2
        className="game-grid"
        container
        spacing={{ xs: 2, md: 3, lg: 5, xl: 8 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 15 }}
      >
        {games.map((game) => (
          <GameCard key={game} appId={game} />
        ))}
        {games.map((game) => (
          <GameCard key={game} appId={game} />
        ))}
        {/* <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard /> */}
      </Grid2>
    </div>
  );
}

// {/* <Grid container>
//   {/* Rendera dynamiskt */}
//   <Grid
//     item
//     key={
//       {
//         /*game.id?*/
//       }
//     }
//   >
//     <GameCard gameImage={game.image} />
//   </Grid>
// </Grid>;

// <Grid
//   container
//   spacing={{ xs: 2, md: 3 }}
//   columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
// >
//   {Array.from(Array(6)).map((_, index) => (
//     <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
//       <Item>{index + 1}</Item>
//     </Grid>
//   ))}
// </Grid>; */}
