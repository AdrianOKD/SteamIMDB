import useGameStore from "../../state/useGameStore";
import "../../Css/gamepage/Tags.css";
import TagsModal from "./TagsModal";
import { useState } from "react";

const Tags = () => {
  const [showAllTags, setShowAllTags] = useState(false);
  const selectedGame = useGameStore((state) => state.selectedGame);

  const themes = selectedGame.themes || [];
  const keywords = selectedGame.keywords || [];
  const gameModes = selectedGame.game_modes || [];

  console.log("Themes array:", themes);
  console.log("Themes length:", themes.length);
  if (!themes || themes.length === 0) {
    return null;
  }

  const openTagsModal = () => {
    setShowAllTags(true);
  };

  const closeTagsModal = () => {
    setShowAllTags(false);
  };

  return (
    <>
      <div className="tags-container">
        {themes.map((theme) => (
          <span key={theme.id} className="tag">
            {theme.name}
          </span>
        ))}
        {(keywords.length > 0 || gameModes.length > 0) && (
          <button onClick={openTagsModal} className="show-more-tags">
            +{keywords.length + gameModes.length} more
          </button>
        )}
      </div>

      {showAllTags && <TagsModal onClose={closeTagsModal} />}
    </>
  );
};

export default Tags;
