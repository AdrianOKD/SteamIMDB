import SteamAppDetails from "../components/SteamAppDetails";
import { Hero } from "../components/Hero";

export function FrontPage() {
  return (
    <>
      <p>
        front page
        <SteamAppDetails appId="594570" />
        <Hero appId="440" />
      </p>
    </>
  );
}
