import "/src/Css/navbar/SearchBar.css";

/**
 * Renders a search input field.
 * @returns {JSX.Element} A text input field with placeholder text.
 */

export function SearchBar() {
  return (
    <>
      <input id="search-input" type="text" placeholder="Search Game..." />
    </>
  );
}
