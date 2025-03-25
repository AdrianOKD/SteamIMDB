import "/src/Css/App.css";
import { Outlet, Route, Routes } from "react-router";
import { Footer } from "./components/Footer.jsx";
import { FrontPage } from "./pages/FrontPage.jsx";
import { GamePage } from "./pages/GamePage.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { LinkPage } from "./pages/LinkPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";
import useGameStore from "./state/useGameStore.js";
import useGames from "./hooks/useGames";

/**
 * The main application component. 
 * It handles the routing and game data initialization. 
 * Fetches gamedata via useGames hook and managaes the game selections through useGameStore.
 * It sets up the applications routes for FrontPage, GamePage, LinkPage and UserPage. With the possibility for additional routes.
 * 
 * @component
 * @returns {jsx.Element} The applications routes.
 */

function App() {
  useGames(40);
  const allGames = useGameStore((state) => state.allGames);

  console.log(allGames);

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
