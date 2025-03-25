import { Link } from "react-router";
import "/src/Css/navbar/NavLinks.css";

/**
 * Renders a navigation link component with customizable styling. 
 * @param {object} props 
 *  @param {any} [props.children="Links to new page"] - The content displayed inside the link example: "homepage", falls back on "Links to new page" if not provided.
 * @param {string} [props.className] - Optional string for unique classNames for each link using this component.
 * @param {string} [props.variant="default"]  - Add standard "variant" css style for link that can be changed for each unique link.
 * @param {string} [props.size="medium"] - Add standard "size" css style for link that can be changed for each unique link. Eg. ("small", "medium", "large" etc.).
 * @param {Object} props.props - Collects all remaining properties passed to the component that was not destructured. 
 * 
 * @returns {jsx.Element} A styled link component
 */

export function NavLinks({
  children,
  className,
  variant = "default",
  size = "medium",
  ...props
}) {
  return (
    <Link className={`link ${variant} ${size} ${className || ""}`} {...props}>
      {children || " Links to new page "}
    </Link>
  );
}
