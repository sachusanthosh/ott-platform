import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/movies/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/movies/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="home">
      <div className="container home-container">
        <div className="home-head">
          <h1 className="home-title">Discover Movies</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies or shows..."
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="home-grid">
          {(results.length > 0 ? results : movies).map((movie, index) => (
            <Card
              key={index}
              movieId={movie._id}
              thumbnail={movie.thumbnail}
              title={movie.title}
              description={movie.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;