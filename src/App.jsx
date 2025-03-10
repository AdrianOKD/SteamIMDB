import "./App.css";
import SteamAppDetails from "./components/SteamAppDetails.jsx";
import { Link, Outlet, Route, Routes,/* useNavigate, useParams */} from 'react-router';
import {Hero} from  "./components/Hero.jsx";
import { NavLinks } from "./components/NavBar/NavLinks.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { FrontPage } from "./pages/FrontPage.jsx";
import { GamePage } from "./pages/GamePage.jsx";
import {NavBar} from "./components/NavBar/NavBar.jsx";
// import { useState } from "react";


function App() {
  // const [frontPage, setFrontPage] = useState(true);

  // Set to false if leaving FrontPage
  // setFrontPage(false);

  // if (frontPage) {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<FrontPage />}></Route>
        <Route path="GamePage" element={<GamePage />}></Route>  
        </Route>
      </Routes> 

    </>
  );
}

function Layout() 
{
  return <> 
   <header>
      <NavBar />
    </header>
    <main>
      <Outlet/>
    </main>
    <footer>
      <Footer />
    </footer>
  </>

}
export default App;
