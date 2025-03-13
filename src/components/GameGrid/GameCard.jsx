import { Grid2 } from "@mui/material";
import "/src/Css/gamegrid/GameCard.css";

export function GameCard({ appId }) {
  return (
    <>
      <Grid2 className="game-card" size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
        <img
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`}
          // src={`https://cdn.akamai.steamstatic.com/steam/apps/${appId}/hero_capsule.jpg`}
          alt=""
          width="100%"
        />
      </Grid2>
    </>
  );
}
