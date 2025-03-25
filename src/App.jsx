import "./App.css";
import SteamAppDetails from "./components/SteamAppDetails.jsx";
import { Link, Outlet, Route, Routes } from "react-router";
import { Hero } from "./components/Hero.jsx";
import { NavLinks } from "./components/NavBar/NavLinks.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { FrontPage } from "./pages/FrontPage.jsx";
import { GamePage } from "./pages/GamePage.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { LinkPage } from "./pages/LinkPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";
import useGameStore from "./state/useGameStore.js";
import { useEffect } from "react";
import useGames from "./hooks/useGames";
// import { useParams } from "react-router";

/**
 * The main application component. 
 * It handles the routing and game data initialization. 
 * Fetches gamedata via useGames hook and managaes the game selections thorugh useGameStore.
 * It sets up the applications routes for FrontPage, GamePage, LinkPage and UserPage. With the possibility for additional routes.
 * 
 * @component
 * @returns {jsx.Element} The applications routes.
 */

function App() {
  useGames(40);
  const allGames = useGameStore((state) => state.allGames);
  const selectGameImages = useGameStore((state) => state.selectGameImages);
  const selectedGameImages = useGameStore((state) => state.selectedGameImages);
  console.log(allGames);

  // Move the selectGameImages call inside a useEffect to prevent infinite loop
  useEffect(() => {
    if (allGames.length > 0) {
      selectGameImages(allGames);
    }
  }, [allGames, selectGameImages]);

  console.log(selectedGameImages);

  // console.log("All game IDs:", allGameIds.length);
  // console.log(selectedGameIds);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FrontPage />}></Route>
          <Route path="GamePage/:id" element={<GamePage />}></Route>
          <Route path="LinkPage" element={<LinkPage />}></Route>
          <Route path="UserPage" element={<UserPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

/**
 * Layout component, providing basic structure for the application. 
 * Renders a header with a navigation bar, an area for main content and a footer.
 * 
 * @component
 * @returns {JSX.Element} Application layout structure.
 */

function Layout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
