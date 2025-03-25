import "/src/Css/buttons/Button.css";
// export function Button() {
//   return (
//     <>
//       <button>WatchList</button>
//     </>
//   );
// }
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

// Looking at your code snippet and project structure, this is a good question about React component architecture.

// Creating a reusable Button component can actually provide several benefits, even when you need different styling in different places:

// 1. **Consistent base styling**: You can define common properties in Button.css while allowing for customization. Your component can accept className props that override or extend the base styles.

// 2. **Behavior encapsulation**: Button components can encapsulate common functionality (click handlers, accessibility features, loading states) while adapting their appearance.

// 3. **Props-based customization**: Instead of creating entirely new buttons, you can pass props like `variant="primary"` or `size="large"` to change styling.

// Your current implementation is very minimal. Here's how you could enhance it to be more reusable:

// ```jsx
// import "./Button.css";

// export function Button({
//   children,
//   className,
//   variant = "default",
//   size = "medium",
//   ...props
// }) {
//   return (
//     <button
//       className={`button ${variant} ${size} ${className || ""}`}
//       {...props}
//     >
//       {children || "Button"}
//     </button>
//   );
// }
// ```

// Then your CSS could define base styles along with variants:

// ```css
// .button {
//   /* Base styles all buttons share */
//   border-radius: 4px;
//   font-family: inherit;
//   cursor: pointer;
// }

// .button.default {
//   background-color: #e0e0e0;
//   color: #333;
// }

// .button.primary {
//   background-color: #1976d2;
//   color: white;
// }

// /* Size variations */
// .button.small { padding: 4px 8px; font-size: 0.8rem; }
// .button.medium { padding: 8px 16px; font-size: 1rem; }
// .button.large { padding: 12px 24px; font-size: 1.2rem; }
// ```

// This approach gives you consistent styling where needed while allowing customization. You'd use it like:

// ```jsx
// <Button>Default Button</Button>
// <Button variant="primary" size="large">Big Blue Button</Button>
// <Button className="custom-style">Custom Styled Button</Button>
// ```

// Your project structure suggests this is a game-related app. For such projects, component reusability can significantly reduce maintenance overhead as your application grows.

// This is a really good question that gets at the heart of component-based architecture in React. Let me walk through why creating a Button component often makes more sense than just using a raw HTML button with a className.

// ### Encapsulation of Logic and Behavior

// When you create a Button component, you're not just styling an element - you're encapsulating behavior. Consider these scenarios:

// 1. **Analytics tracking**: If you want to track all button clicks across your application, with a component you can add this in one place:

// ```jsx
// function Button({ onClick, ...props }) {
//   const handleClick = (e) => {
//     // Track the click in analytics
//     trackButtonClick(props.id || props.children);
//     // Then call the original onClick handler
//     if (onClick) onClick(e);
//   };

//   return <button onClick={handleClick} {...props} />;
// }
// ```

// 2. **Accessibility enhancements**: Your component can automatically handle focus states, keyboard navigation, or ARIA attributes:

// ```jsx
// function Button({ disabled, ...props }) {
//   return (
//     <button
//       disabled={disabled}
//       aria-disabled={disabled}
//       {...props}
//     />
//   );
// }
// ```

// 3. **Loading states**: A common pattern is showing loading indicators on buttons during async operations:

// ```jsx
// function Button({ isLoading, children, ...props }) {
//   return (
//     <button disabled={isLoading} {...props}>
//       {isLoading ? <LoadingSpinner /> : children}
//     </button>
//   );
// }
// ```

// ### Consistency and Maintainability

// When your application grows, maintaining consistency becomes challenging. With a Button component:

// 1. **Global style changes**: If your design system changes (maybe rounded corners become square), you change it in one place instead of hunting down every button in your codebase.

// 2. **Theme support**: Your component can automatically adapt to theme changes:

// ```jsx
// function Button({ variant = "default", ...props }) {
//   const theme = useTheme(); // A hook that provides current theme

//   return (
//     <button
//       style={{
//         backgroundColor: theme.colors[variant],
//         color: theme.textColors[variant]
//       }}
//       {...props}
//     />
//   );
// }
// ```

// 3. **Standardized variations**: Your Button component can enforce design system rules:

// ```jsx
// function Button({ variant = "primary", size = "medium", ...props }) {
//   const sizeMap = {
//     small: { padding: "4px 8px", fontSize: "12px" },
//     medium: { padding: "8px 16px", fontSize: "14px" },
//     large: { padding: "12px 24px", fontSize: "16px" }
//   };

//   return <button className={`btn-${variant}`} style={sizeMap[size]} {...props} />;
// }
// ```

// ### Developer Experience

// A well-designed component improves how developers interact with your codebase:

// 1. **IntelliSense/autocomplete**: IDEs can suggest props for your component, but won't know about your className conventions.

// 2. **Documentation**: You can document expected props, behaviors and variations in one place.

// 3. **Prop validation**: You can validate props to prevent common errors:

// ```jsx
// Button.propTypes = {
//   variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   isLoading: PropTypes.bool
// };
// ```

// ### A Practical Middle Ground

// Looking at your specific case with the GamePage.jsx file, a good middle ground might be a Button component that accepts all standard button attributes while adding useful features:

// ```jsx
// function Button({
//   className,
//   children,
//   variant = "default",
//   ...props
// }) {
//   // Combine the base button class with any additional classes
//   const buttonClass = `button button-${variant} ${className || ""}`.trim();

//   return (
//     <button className={buttonClass} {...props}>
//       {children}
//     </button>
//   );
// }
// ```

// This allows you to do things like:

// ```jsx
// // Different styling through variants
// <Button variant="primary">Primary Action</Button>

// // Custom styling with className
// <Button className="game-action">Game Action</Button>

// // Both together
// <Button variant="secondary" className="sidebar-action">Settings</Button>

// // With standard button attributes
// <Button onClick={handleClick} disabled={isLoading} type="submit">Submit</Button>
// ```

// The value of this approach becomes more apparent as your application grows and your UI requirements become more complex. For very simple applications, raw HTML elements might be sufficient, but component-based architecture pays dividends as complexity increases.
