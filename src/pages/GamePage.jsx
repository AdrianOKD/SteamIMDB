import { useParams } from "react-router";
import useGameStore from "../state/useGameStore";
import { useEffect } from "react";
import { GameDescription } from "../components/GamePage/GameDescription";
import "/src/Css/gamepage/GameTitle.css";
import "/src/Css/gamepage/GameContainer.css";
import "./GamePage.css";

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
      <div className="game-page">
        <section className="game-container">
          <h1 className="game-title">{selectedGame.name}</h1>
          <div>GameMedia</div>
          <div className="right-side-content">
            <div>Header/banner image</div>
            <div>Details List</div>
            <div>Tags</div>
            <div>ActionButtons</div>
          </div>
          <div className="game-details">
            <GameDescription />
            <div>More About this Game (Detailed Description)</div>
            <div>System Requirements</div>
          </div>

          <p>{selectedGame.id}</p>
        </section>
      </div>
    </>
  );
}
