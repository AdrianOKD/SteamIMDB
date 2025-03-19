import { Grid2 } from "@mui/material";
import "./GameMedia.css";
import { GameScreenshot } from "./GameScreenshot";

function GameMedia() {
  return (
    <>
      <Grid2 className="media-container" container spacing={2}>
        <GameScreenshot
          variant="large"
          src="https://images.igdb.com/igdb/image/upload/t_720p/sc6exx.jpg"
        />
        <GameScreenshot
          variant="small"
          src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6exx.jpg"
        />
        <GameScreenshot
          variant="small"
          src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6exx.jpg"
        />
        <GameScreenshot
          variant="small"
          src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6exx.jpg"
        />
        <GameScreenshot
          variant="small"
          src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6exx.jpg"
        />
        <GameScreenshot
          variant="small"
          src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6exx.jpg"
        />
        <GameScreenshot
          variant="small"
          src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6exx.jpg"
        />
      </Grid2>
    </>
  );
}

export default GameMedia;
