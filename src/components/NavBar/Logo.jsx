import { Link } from "react-router";
import "/src/Css/navbar/Logo.css";

/**
 * Renders a clickable logo as a link to homepage.
 * 
 * @returns {jsx.Element} A react component displaying a logo wrapped in a link.
 */

export function Logo() {
  return (
    <>
      <Link to="/">
        <img src="/src/components/assets/logo.png" alt="" id="logo" />
      </Link>
    </>
  );
}
