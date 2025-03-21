import { useParams } from "react-router";
import useGameStore from "../state/useGameStore";
import { useEffect } from "react";
import GameMedia from "../components/GamePage/GameMedia";
import { GameDetailsList } from "../components/GamePage/GameDetailsList";
import { GameDescription } from "../components/GamePage/GameDescription";
import DetailedDescription from "../components/GamePage/DetailedDescription";
import Tags from "../components/GamePage/Tags";
import "/src/Css/gamepage/GameTitle.css";
import "/src/Css/gamepage/GameContainer.css";
import "./GamePage.css";
import { GamePageButton } from "../components/GamePage/GamePageButton";

export function GamePage() {
  const { id } = useParams();
  const games = useGameStore((state) => state.allGames);
  const selectGame = useGameStore((state) => state.selectGame);
  useEffect(() => {
    selectGame(games, id);
    console.log("Selected Game:", selectedGame);
  }, [id, games, selectGame]);
  const selectedGame = useGameStore((state) => state.selectedGame);
  return (
    <>
      <div className="game-page">
        <section className="game-container">
          <h1 className="game-title">{selectedGame.name}</h1>
          <GameMedia />
          <div className="right-side-content">
            <div>Header/banner image</div>
            <div>
              <GameDetailsList selectedGame={selectedGame} />
            </div>
            <Tags />
            <div>
              <GamePageButton variant="gamepage" size="small">
                Add to Wishlist
              </GamePageButton>
              <GamePageButton variant="gamepage" size="small">
                Follow
              </GamePageButton>
            </div>

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
