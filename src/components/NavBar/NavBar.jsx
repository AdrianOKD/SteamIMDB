import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { SearchBar } from "./SearchBar";
import { UserLinks } from "./UserLinks";
import { ButtonDynamic } from "../ButtonDynamic";
import "/src/Css/navbar/NavBar.css";

/**
 * Renders a navbar that displays links, a searchbar and a button.
 * Its divided in three sections
 * - Left-side: Logo and navigation links to new page.
 * - Middle: searchbar
 * - Right-side: user-links and a watchlist button.
 *
 * @returns {jsx.Element} A react component that displays the whole navigation bar.
 */

export function NavBar() {
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar-left-container">
            <Logo />
            <NavLinks to="/LinkPage" variant="default" size="medium">
              Store
            </NavLinks>
            <NavLinks to="/LinkPage" variant="default" size="medium">
              News
            </NavLinks>
            <NavLinks to="/LinkPage" variant="default" size="medium">
              Community
            </NavLinks>
          </div>
          <div className="navbar-middle-container">
            <SearchBar />
          </div>
          <div className="navbar-right-container">
            <div className="user-links">
              <UserLinks to="/UserPage" variant="default" size="medium">
                Profile
              </UserLinks>
              <UserLinks to="/UserPage" variant="default" size="medium">
                Sign in
              </UserLinks>
            </div>
            <ButtonDynamic variant="wishlist" size="small">
              Watchlist
            </ButtonDynamic>
          </div>
        </div>
      </nav>
    </>
  );
}
