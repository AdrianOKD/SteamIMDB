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
            < Logo />
            <NavLinks to="/LinkPage" variant="default" size="medium">Store</NavLinks >
            <NavLinks to="/LinkPage" variant="default" size="medium">News stand</NavLinks>
            <NavLinks to="/LinkPage" variant="default" size="medium">Community</NavLinks>
            
          </div>
          <div className="navbar-middle-container">
            <SearchBar />
          </div>
          <div className="navbar-right-container">
            <div className="user-links">
            
              <UserLinks to="/UserPage" variant="default" size="medium">Profile</UserLinks>
              <UserLinks to="/UserPage" variant="default" size="medium">Sign in</UserLinks>
          </div>
            <Button variant="watchlist" size="small">Watchlist</Button>
          </div>
        </div>
      </nav>
    </>
  );
}


