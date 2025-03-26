import "/src/Css/buttons/Button.css";



/**
 * Renders a button component with customizable styling. 
 * @param {object} props 
 * @param {any} [props.children="Links to new user page"] - The content displayed inside the button example: "watchlist", falls back to "button" if not provided.
 * @param {string} [props.className] - Optional string for unique classNames for each button using this component.
 * @param {string} [props.variant="default"]  - Add standard "variant" css style for button that can be changed for each unique button.
 * @param {string} [props.size="medium"] - Add standard "size" css style for button that can be changed for each unique button. Eg. ("small", "medium", "large" etc.).
 * @param {Object} props.props - Collects all remaining properties passed to the component that was not destructured. 
 * 
 * @returns {jsx.Element} A styled link component for user navigation
 */
export function ButtonDynamic({
  children,
  className,
  variant = "default",
  size = "medium",
  ...props
}) {
  return (
    <button
      className={`button ${variant} ${size} ${className || ""}`}
      {...props}
    >
      {children || "Button"}
    </button>
  );
}
