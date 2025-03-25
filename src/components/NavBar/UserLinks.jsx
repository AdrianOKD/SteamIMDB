import "/src/Css/navbar/UserLinks.css";
import { Link } from "react-router";

/**
 * Renders a  user-related navigation link component with customizable styling. 
 * @param {object} props 
 *  @param {any} [props.children="Links to new user page"] - The content displayed inside the link example: "homepage", falls back on "Links to new page" if not provided.
 * @param {string} [props.className] - Optional string for unique classNames for each link using this component.
 * @param {string} [props.variant="default"]  - Add standard "variant" css style for link that can be changed for each unique link.
 * @param {string} [props.size="medium"] - Add standard "size" css style for link that can be changed for each unique link. Eg. ("small", "medium", "large" etc.).
 * @param {Object} props.props - Collects all remaining properties passed to the component that was not destructured. 
 * 
 * @returns {jsx.Element} A styled link component for user navigation
 */

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
      {children || "Links to new user page "}
    </Link>
  );
}
