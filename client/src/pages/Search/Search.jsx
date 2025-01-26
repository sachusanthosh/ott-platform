import { useState } from "react";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Replace with your search API endpoint
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="search-container">
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies or shows..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="result-item">
              <h2>{result.title}</h2>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;