import { Grid2 } from "@mui/material";
import "/src/Css/frontpage/GameCard.css";
import { convertImageSize } from "../../utils/imageUtils";
import { Link } from "react-router";
/**
 * @module GameCard
 * @description A component that displays a game card with cover image
 */
/**
 * GameCard component renders a grid item with a game cover image that links to the game's detail page
 *
 * @param {Object} props - Component props

 *
 * @returns {JSX.Element} A Grid component containing the game cover image wrapped in a link
 */
export function GameCard({ game }) {
  const imageURL = convertImageSize(game?.cover?.url, "t_thumb", "t_cover_big");
  return (
    <Grid2 className="game-card" size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
      <Link to={`/GamePage/${game.id}`}>
        <img src={imageURL} alt={game.name} width="100%" />
      </Link>
    </Grid2>
  );
}
