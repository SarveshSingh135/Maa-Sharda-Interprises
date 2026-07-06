export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Search Products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}