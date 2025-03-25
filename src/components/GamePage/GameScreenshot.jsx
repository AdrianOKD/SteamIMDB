import "./GameScreenshot.css";
import { Grid2 } from "@mui/material";


/**
 * Renders a game screenshot with configurable grid size
 * 
 * @param {Object} props - Component properties
 * @param {'small' | 'medium' | 'large'} [props.variant='medium'] - Size variant of the screenshot
 * @param {string} props.src - Source URL of the screenshot
 * @param {Function} [props.onClick] - Optional click handler
 * @returns {JSX.Element} Rendered screenshot component
 */
export function GameScreenshot({ variant = "medium", ...props }) {
  const isValidVariant =
    variant === "small" || variant === "medium" || variant === "large";
  const actualVariant = isValidVariant ? variant : "medium";

  const gridSize = {
    small: 2,
    medium: 6,
    large: 12,
  }[actualVariant];

  return (
    <Grid2 size={gridSize} className={`screenshot ${actualVariant}`} {...props}>
      <img className="screenshot" src={props.src} />
    </Grid2>
  );
}
