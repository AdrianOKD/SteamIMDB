import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import useGameStore from "../../state/useGameStore";
import "../../Css/gamepage/DetailedDescription.css";

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
