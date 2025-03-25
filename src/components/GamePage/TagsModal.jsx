import useGameStore from "../../state/useGameStore";
import "../../Css/gamepage/Tags.css";
import { IoClose } from "react-icons/io5";

/**
 * Modal component that displays all tags associated with a game.
 * Shows themes, game modes, and keywords in separate sections when available.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when the modal should close
 * @returns {JSX.Element} The modal component with all game tags
 */
const TagsModal = ({ onClose }) => {
  const selectedGame = useGameStore((state) => state.selectedGame);
  const themes = selectedGame.themes || [];
  const keywords = selectedGame.keywords || [];
  const gameModes = selectedGame.game_modes || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>All Game Tags: {selectedGame.name}</h3>
          <button className="close-button" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <div className="modal-body">
          {themes.length > 0 && (
            <div className="tag-section">
              <h4>Themes</h4>
              <div className="tags-container">
                {themes.map((theme) => (
                  <span key={theme.id} className="tag theme-tag">
                    {theme.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {gameModes.length > 0 && (
            <div className="tag-section">
              <h4>Game Modes</h4>
              <div className="tags-container">
                {gameModes.map((mode) => (
                  <span key={mode.id} className="tag mode-tag">
                    {mode.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {keywords.length > 0 && (
            <div className="tag-section">
              <h4>Keywords</h4>
              <div className="tags-container">
                {keywords.map((keyword) => (
                  <span key={keyword.id} className="tag keyword-tag">
                    {keyword.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsModal;
