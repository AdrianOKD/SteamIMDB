import { Grid2 } from "@mui/material";
import "/src/Css/gamepage/GameMedia.css";
import { GameScreenshot } from "./GameScreenshot";
import useGameStore from "../../state/useGameStore";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

/**
 * Renders a grid containing game screenshots with navigation and interaction
 *
 * @component
 * @returns {JSX.Element} Game media gallery component
 */
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

  /**
   * Updates the main screenshot in the store
   *
   * @param {string} screenshot - URL of the screenshot to set as main
   */
  const swapMainScreenshot = (screenshot) => {
    useGameStore.getState().selectMainScreenshot(screenshot);
  };

  /**
   * Rotates the screenshot carousel
   *
   * @param {number} index - Index for selecting current array of screenshots.
   */
  const rotateCarousel = (index) => {
    selectScreenshotsCurrent(index);
  };

  return (
    <>
    
   
      <Grid2 className="media-container" container spacing={2}>
        
        {/* Main screenshot */}
        <GameScreenshot variant="large" src={mainScreenshot} />

        {/* Rest of the screenshots */}
        <Grid2 className="button-carousel-1" size={1} >
        <button onClick={() => rotateCarousel(-1)}>
          {" "}
          <SlArrowLeft />{" "}
        </button>
        </Grid2>
        {screenshots.map((screenshot) => (
          <GameScreenshot
            variant="small"
            src={screenshot}
            onClick={() => swapMainScreenshot(screenshot)}
          />
        ))}
        <Grid2 className="button-carousel-2" size={1} >
         <button onClick={() => rotateCarousel(1)}>
          <SlArrowRight />
        </button>
        </Grid2>
      </Grid2>
     
    </>
  );
}

export default GameMedia;
