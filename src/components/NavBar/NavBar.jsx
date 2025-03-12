import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { SearchBar } from "./SearchBar";
import { UserLinks } from "./UserLinks";
import { Button } from "../Button";
import "/src/Css/navbar/NavBar.css";


export function NavBar() {
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar-left-container">
            <Logo />
            <NavLinks />
          </div>
          <div className="navbar-middle-container">
            <SearchBar />
          </div>
          <div className="navbar-right-container">
            <UserLinks /> <Button variant="watchlist" size="small">Watchlist</Button>
          </div>
        </div>
      </nav>
    </>
  );
}


