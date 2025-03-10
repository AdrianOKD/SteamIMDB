import "./SearchBar.css"

export function SearchBar() {
  return (
    <>
      <div className="search-bar">
        <input id="search-input" type="text" placeholder="Search Game..." />
        <button>search</button>
      </div>
    </>
  );
}
