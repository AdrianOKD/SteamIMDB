import SteamAppDetails from "../components/SteamAppDetails";
import { Hero } from "../components/Hero";

export function FrontPage() {
  return (
    <>
      <div>
        <p>front page</p>
        <SteamAppDetails appId="594570" />
        <Hero appId="440" />
      </div>
    </>
  );
}
