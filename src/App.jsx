import './App.css'
import SteamAppDetails from './components/SteamAppDetails.jsx'
import Hero from './components/Hero.jsx'


function App() {

  return (
    <>
      <div>
        <h1>WELCOME TO OUR APP!
        </h1>
        <SteamAppDetails appId="594570" />
        <Hero appId="440" />
      </div>
    </>
  )
}

export default App
