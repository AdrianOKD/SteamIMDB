import "./GameScreenshot.css"
import { Grid2 } from "@mui/material";

export function GameScreenshot({ variant = "medium", ...props }) {
  const isValidVariant = variant === "small" || variant === "medium" || variant === "large";
  const actualVariant = isValidVariant ? variant : "medium";
  
  const gridSize = {
    small: 2,
    medium: 6,
    large: 12
  }[actualVariant];

  return (
    <Grid2 size={gridSize} className={`screenshot ${actualVariant}`} {...props}>
      <img className="screenshot" src={props.src} />
    </Grid2>
  );
}