import React from "react";
import "/src/Css/gamepage/GameDescription.css";
import useGameStore from "../../state/useGameStore";

/**
 * @property {string} [summary] - The summary/description text of the game
 * @property {number} [id] - Unique identifier for the game
 */
/**
 * @description GameDescription component displays the summary of the currently selected game.
 * If no game is selected or the selected game has no summary, a default message is shown.
 *
 * @returns {JSX.Element} A section containing the game description or a default message
 */
export function GameDescription() {
  const selectedGame = useGameStore((state) => state.selectedGame);

  return (
    <>
      <section className="game-description">
        <div>
          {selectedGame && selectedGame.summary
            ? selectedGame.summary
            : "The game description will be available soon."}
        </div>
      </section>
    </>
  );
}
