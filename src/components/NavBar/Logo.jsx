import "/src/Css/navbar/Logo.css";
import { Link } from "react-router";

export function Logo() {
  return (
    <>
      <Link to="/" id="logo">
        <img src="src\components\assets\react.svg" alt="" />
      </Link>
    </>
  );
}
