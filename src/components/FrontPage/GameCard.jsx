import { Grid2 } from "@mui/material";
import "/src/Css/gamegrid/GameCard.css";
import { convertImageSize } from "../../utils/imageUtils";
import { Link } from "react-router";

export function GameCard({ game } ) {
  const imageURL = convertImageSize(game?.cover?.url, "t_thumb", "t_cover_big")

  return (
      <Grid2 className="game-card" size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
        <Link to={`/GamePage/${game.id}`}>
        <img
          src={imageURL}
          alt={game.name}
          width="100%"
        />
        </Link>
      </Grid2>
  );
}