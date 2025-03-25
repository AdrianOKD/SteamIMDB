import { Grid2 } from "@mui/material";
import "./GameMedia.css";
import { GameScreenshot } from "./GameScreenshot";
import useGameStore from "../../state/useGameStore";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function GameMedia() {
  const screenshots = useGameStore((state) => state.selectedScreenshotsCurrent);
  const selectScreenshotsCurrent = useGameStore(
    (state) => state.selectScreenshotsCurrent
  );
  let mainScreenshot = useGameStore((state) => state.selectedMainScreenshot);
  console.log(useGameStore.getState());
  if (!screenshots || screenshots.length === 0) {
    return <div>No screenshots available</div>;
  }

  if (mainScreenshot === null) {
    mainScreenshot = screenshots[0];
  }

  // Support for Modal/Pop-up screenshot, should we implement?
  const openScreenshotModal = (src) => {
    useGameStore.getState().selectModalScreenshot(src);
    alert("modal goes here");
  };

  const swapMainScreenshot = (screenshot) => {
    useGameStore.getState().selectMainScreenshot(screenshot);
  };

  const rotateCarousel = (index) => {
    selectScreenshotsCurrent(index);
  };

  return (
    <div>
      <Grid2 className="media-container" container spacing={2}>
        {/* Main screenshot */}
        <GameScreenshot
          variant="large"
          src={mainScreenshot}
          onClick={() => openScreenshotModal(mainScreenshot)}
        />

        {/* Rest of the screenshots */}
        {screenshots.map((screenshot) => (
          <GameScreenshot
            variant="small"
            src={screenshot}
            onClick={() => swapMainScreenshot(screenshot)}
          />
        ))}
      </Grid2>
      <div className="button-container">
        <button onClick={() => rotateCarousel(-1)}> <SlArrowLeft /> </button>
        <button onClick={() => rotateCarousel(1)}><SlArrowRight /></button>
      </div>
    </div>
  );
}

export default GameMedia;
