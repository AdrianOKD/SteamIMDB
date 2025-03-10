import "./Logo.css";
import { Link } from "react-router";

export function Logo() {
  return (
    <>
      <Link to="/">
        <img src="src\components\assets\react.svg" alt="" />
      </Link>
    </>
  );
}
