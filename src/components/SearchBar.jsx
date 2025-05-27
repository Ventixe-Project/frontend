const SearchBar = ({ query, setQuery }) => (
    <form className="search-bar-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search event, location, etc"
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="material-symbols-outlined">search</span>
    </form>
);

export default SearchBar;
