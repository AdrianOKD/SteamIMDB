import React from "react";
import "/src/Css/gamepage/GameDescription.css";
import useGameStore from "../../state/useGameStore";

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
