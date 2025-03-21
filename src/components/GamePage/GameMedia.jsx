import { Grid2 } from "@mui/material";
import "./GameMedia.css";
import { GameScreenshot } from "./GameScreenshot";
import useGameStore from "../../state/useGameStore";

function GameMedia() {
  const screenshots = useGameStore(state => state.selectedScreenshotsCurrent);
  let mainScreenshot = useGameStore(state => state.selectedMainScreenshot);
  
  if (!screenshots || screenshots.length === 0) {
    return <div>No screenshots available</div>;
  }

  if (mainScreenshot === null){
    mainScreenshot = screenshots[0]
  }

  
  // Support for Modal/Pop-up screenshot, should we implement?
  const openScreenshotModal = (src) => {
    useGameStore.getState().selectModalScreenshot(src);
    alert("modal goes here");
  };

  const swapMainScreenshot = (screenshot) => {
    useGameStore.getState().selectMainScreenshot(screenshot);
  }

  return (
    <Grid2 className="media-container" container spacing={2}>
      {/* Main screenshot */}
      <GameScreenshot 
        variant="large" 
        src={mainScreenshot} 
        onClick={() => openScreenshotModal(mainScreenshot)}
      />
      
      {/* Rest of the screenshots */}
      {screenshots.map((screenshot, index) => (
        <GameScreenshot
          key={index}
          variant="small"
          src={screenshot}
          onClick={() => swapMainScreenshot(screenshot)}
        />
      ))}
    </Grid2>
  );
}

export default GameMedia;