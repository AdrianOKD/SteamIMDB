import { useParams } from "react-router";
import useGameStore from "../state/useGameStore";
import { useEffect } from "react";


export function GamePage() {
  const { id } = useParams();
  const games = useGameStore((state) => state.allGames);
  const selectGame = useGameStore((state) => state.selectGame);
  // const game = ;
  useEffect(() => {
    selectGame(games, id);
    

    
  }, [id, games]);
  const selectedGame = useGameStore((state) => state.selectedGame)
  return (
    <>
      <div>
        <p>game page</p>
        <p>{selectedGame.id}</p>
      </div>
    </>
  );
}
