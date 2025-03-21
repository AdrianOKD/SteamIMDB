import React, { useEffect } from "react";
import useGameStore from "../../state/useGameStore";
import useGames from "../../hooks/useGames";
import useCompanies from "../../hooks/useCompanies";

export function DevPub({ gameId }) {
  const { games, loading: gamesLoading } = useGames();
  const { initialized: companiesInitialized } = useCompanies(); // This initializes the companies cache

  const { selectedGame, setSelectedGame, getCompaniesForGame } = useGameStore(
    (state) => ({
      selectedGame: state.selectedGame,
      setSelectedGame: state.setSelectedGame,
      getCompaniesForGame: state.getCompaniesForGame,
    })
  );

  // Set the selected game when gameId changes
  useEffect(() => {
    if (games.length > 0 && gameId) {
      const game = games.find((g) => g.id === gameId);
      if (game) setSelectedGame(game);
    }
  }, [games, gameId, setSelectedGame]);

  // If we're still loading, show a loading state
  if (gamesLoading || !companiesInitialized) {
    return <div>Loading game details...</div>;
  }

  if (!selectedGame) {
    return <div>No game selected</div>;
  }

  // Get developers and publishers using our helper method
  const { developers, publishers } = getCompaniesForGame();

  return (
    <div className="game-details">
      <h1>{selectedGame.name}</h1>

      {/* Show developers */}
      <div className="developers">
        <h3>Developers:</h3>
        {developers.length > 0 ? (
          <ul>
            {developers.map((dev) => (
              <li key={dev.id}>{dev.name}</li>
            ))}
          </ul>
        ) : (
          <p>No developer information available</p>
        )}
      </div>

      {/* Show publishers */}
      <div className="publishers">
        <h3>Publishers:</h3>
        {publishers.length > 0 ? (
          <ul>
            {publishers.map((pub) => (
              <li key={pub.id}>{pub.name}</li>
            ))}
          </ul>
        ) : (
          <p>No publisher information available</p>
        )}
      </div>

      {/* Rest of your game details */}
    </div>
  );
}

export default DevPub;
