import { useParams } from "react-router";
import useGameStore from "../state/useGameStore";
import { useEffect } from "react";
import { GameDetailsList } from "../components/GamePage/GameDetailsList";
import { GameDescription } from "../components/GamePage/GameDescription";
import "/src/Css/gamepage/GameTitle.css";
import "/src/Css/gamepage/GameContainer.css";
import "./GamePage.css";
import DetailedDescription from "../components/GamePage/DetailedDescription";

export function GamePage() {
  const { id } = useParams();
  const games = useGameStore((state) => state.allGames);
  const selectGame = useGameStore((state) => state.selectGame);
  useEffect(() => {
    selectGame(games, id);
  }, [id, games, selectGame]);
  const selectedGame = useGameStore((state) => state.selectedGame);
  return (
    <>
      <div className="game-page">
        <section className="game-container">
          <h1 className="game-title">{selectedGame.name}</h1>
          <div>GameMedia</div>
          <div className="right-side-content">
            <div>Header/banner image</div>
            <div><GameDetailsList selectedGame={selectedGame} /></div>
            <div>Tags</div>
            <div>ActionButtons</div>
          </div>
          <div className="game-details">
            <GameDescription />
            <DetailedDescription />
            <div>System Requirements</div>
          </div>
          <p>{selectedGame.id}</p>
        </section>
      </div>
    </>
  );
}
