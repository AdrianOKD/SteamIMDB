import useGameStore from "../../state/useGameStore";
import "../../Css/gamepage/Tags.css";
import TagsModal from "./TagsModal";
import { useState } from "react";

/**
 * Displays game tags/themes and provides access to additional keywords and game modes.
 * Shows theme tags with an option to view more tags in a modal if keywords or game modes exist.
 * Returns null if no themes are available.
 *
 * @returns {JSX.Element|null} The tags component or null if no themes exist
 */
const Tags = () => {
  const [showAllTags, setShowAllTags] = useState(false);
  const selectedGame = useGameStore((state) => state.selectedGame);
  const themes = selectedGame.themes || [];
  const keywords = selectedGame.keywords || [];
  const gameModes = selectedGame.game_modes || [];

  if (!themes || themes.length === 0) {
    return null;
  }

  /**
   * Opens the modal to display all tags, keywords, and game modes
   */
  const openTagsModal = () => {
    setShowAllTags(true);
  };

  /**
   * Closes the tags modal
   */
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
