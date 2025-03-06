import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { SearchBar } from "./SearchBar";
import { UserLinks } from "./UserLinks";
// import { Button } from "./Button";

function NavBar() {
  return (
    <>
      <nav>
        <div>
          <div>
            <Logo />
            <NavLinks />
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <UserLinks />
            {/* <Button /> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
