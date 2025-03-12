import "/src/Css/navbar/UserLinks.css";
import { Link } from "react-router";



export function UserLinks({
  children,
  className,
  variant = "default",
  size = "medium",
  ...props
}) {
  return (
    <Link
      className={`user-link ${variant} ${size} ${className || ""}`}
      {...props}
    >
      {children ||  "potato"}
    </Link>
  );
}
