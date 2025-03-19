import SteamAppDetails from "../components/SteamAppDetails";
import { Hero } from "../components/Hero";
import { GameGrid } from "../components/FrontPage/GameGrid";

export function FrontPage() {
  return (
    <>
      <div className="front-page">
        <h1>Games</h1>
        <GameGrid />
      </div>
    </>
  );
}
