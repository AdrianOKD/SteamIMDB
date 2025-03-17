import { Link } from "react-router";
import "/src/Css/navbar/Logo.css"

export function Logo() {
  return (
    <>
      <Link to="/" >
        <img src="/src/components/assets/logo.png" alt="" id="logo"/>
      </Link>
    </>
  );
}
