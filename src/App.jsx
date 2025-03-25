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
