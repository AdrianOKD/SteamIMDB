import './App.css'
import Car from './components/Car.jsx'
import MyButton from './components/MyButton.jsx'
import SteamAppDetails from './components/SteamAppDetails.jsx'
import Hero from './components/Hero.jsx'


function App() {

  return (
    <>
      <div>
        <h1>WELCOME TO OUR APP!
        </h1>
        <Car />
        <MyButton />
        <SteamAppDetails appId="594570" />
        <Hero />
      </div>
    </>
  )
}

export default App
