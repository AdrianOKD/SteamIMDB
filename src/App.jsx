import "./App.css";
import SteamAppDetails from "./components/SteamAppDetails.jsx";
import Hero from "./components/Hero.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { useState } from "react";

function App() {
  const [frontPage, setFrontPage] = useState(true);

 // Set to false if leaving FrontPage
  // setFrontPage(false);
  
  if (frontPage) {
    return (
      <>
        <div>
          <NavBar />
          <SteamAppDetails appId="594570" />
          <Hero appId="440" />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <NavBar />
        <SteamAppDetails appId="594570" />
        <Hero appId="440" />
      </div>
    </>
  );
}

export default App;
