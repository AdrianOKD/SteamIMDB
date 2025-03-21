import { Link } from "react-router";
import "/src/Css/navbar/NavLinks.css";

export function NavLinks({
  children,
  className,
  variant = "default",
  size = "medium",
  ...props
}) {
  return (
    <Link className={`link ${variant} ${size} ${className || ""}`} {...props}>
      {children || "potato"}
    </Link>
  );
}
