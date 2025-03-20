import "../../Css/buttons/Button.css";

export function GamePageButton({
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
