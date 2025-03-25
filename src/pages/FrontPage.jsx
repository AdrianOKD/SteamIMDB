import { GameGrid } from "../components/frontpage/GameGrid";
import "/src/Css/frontpage/FrontPage.css"

export function FrontPage() {
  return (
    <>
      <div className="front-page">
        <GameGrid />
      </div>
    </>
  );
}
