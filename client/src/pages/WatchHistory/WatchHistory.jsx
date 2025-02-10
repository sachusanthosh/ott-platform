import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./WatchHistory.css";
import axios from "axios";

const WatchHistory = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/movies/watch-history", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setMovies(response.data.watchHistory);
      })
      .catch((error) => {
        console.error("Error fetching Watch Later movies:", error);
      });
  }, []);

  return (
    <div className="watch-history">
      <div className="container watch-history-container">
        <div className="watch-history-head">
          <h1 className="watch-history-title">Your History</h1>
        </div>
        <div className="watch-history-grid">
          {movies.map((movie, index) => (
            <Card
              key={index}
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

export default WatchHistory;
