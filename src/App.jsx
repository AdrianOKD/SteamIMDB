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

function App() {
  // Use the games hook to fetch data
  const { games, loading, error } = useGames();

  // Access the selectRandomGames function from the store
  const selectRandomGames = useGameStore((state) => state.selectRandomGames);

  // After games are loaded, select random games
  useEffect(() => {
    if (games.length > 0) {
      selectRandomGames();
    }
  }, [games, selectRandomGames]);

  // For debugging
  const allGameIds = useGameStore((state) => state.allGameIds);
  const selectedGameIds = useGameStore((state) => state.selectedGameIds);

  // console.log("All game IDs:", allGameIds.length);
  console.log(selectedGameIds);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FrontPage />}></Route>
          <Route path="GamePage" element={<GamePage />}></Route>
          <Route path="LinkPage" element={<LinkPage />}></Route>
          <Route path="UserPage" element={<UserPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

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
