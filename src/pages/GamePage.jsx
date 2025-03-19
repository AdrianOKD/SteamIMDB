import { useParams } from "react-router";
import useGameStore from "../state/useGameStore";
import { useEffect } from "react";
import GameMedia from "../components/GamePage/GameMedia";

export function GamePage() {
  const { id } = useParams();
  const games = useGameStore((state) => state.allGames);
  const selectGame = useGameStore((state) => state.selectGame);
  // const game = ;
  useEffect(() => {
    selectGame(games, id);
  }, [id, games]);
  const selectedGame = useGameStore((state) => state.selectedGame);
  return (
    <>
      <div className="GamePage">
        <main className="game-container">
        <div>GameTitle</div>
        <GameMedia />
        <div className="right-side-content">
          <div>Header/banner image</div>
          <div>Details List</div>
          <div>Tags</div>
          <div>ActionButtons</div>
        </div>
        <div className="game-details">
          <div>Short Description</div>
          <div>More About this Game (Detailed Description)</div>
          <div>System Requirements</div>
        </div>

        <p>{selectedGame.id}</p>

        </main>
        
      </div>
    </>
  );
}
