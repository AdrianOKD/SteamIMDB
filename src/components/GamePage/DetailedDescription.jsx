import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import useGameStore from "../../state/useGameStore";
import "../../Css/gamepage/DetailedDescription.css";

/**
 * Component that displays an expandable/collapsible section with a game's storyline.
 * Shows a header that can be clicked to expand/collapse the full storyline text.
 * If no storyline is available, it displays a fallback message.
 *
 * @returns {React.ReactElement} A collapsible container with the game's storyline
 */
const DetailedDescription = () => {
  const selectedGame = useGameStore((state) => state.selectedGame);
  const [isExpanded, setIsExpanded] = useState(false);
  const storyline = selectedGame.storyline;

  if (!storyline || storyline.trim() === "") {
    return <p>No description available</p>;
  }

  return (
    <div className="storyline-container">
      <h3
        className="storyline-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        More about this game{" "}
        {isExpanded ? (
          <FaChevronDown className="chevron-icon" />
        ) : (
          <FaChevronRight className="chevron-icon" />
        )}
      </h3>
      {isExpanded && <p className="description-text">{storyline}</p>}
    </div>
  );
};

export default DetailedDescription;
