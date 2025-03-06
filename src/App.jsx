import "./App.css";
import SteamAppDetails from "./components/SteamAppDetails.jsx";
import { Hero } from "./components/Hero.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { NavLinks } from "./components/NavBar/NavLinks.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
// import { useState } from "react";

function App() {
  // const [frontPage, setFrontPage] = useState(true);

  // Set to false if leaving FrontPage
  // setFrontPage(false);

  // if (frontPage) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {/*Main section*/}
        <SteamAppDetails appId="594570" />
        <Hero appId="440" />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
  // }

  // return (
  //   <>
  //     <div>
  //       <NavBar />
  //       <SteamAppDetails appId="594570" />
  //       <Hero appId="440" />
  //     </div>
  //   </>
  // );
}

export default App;
