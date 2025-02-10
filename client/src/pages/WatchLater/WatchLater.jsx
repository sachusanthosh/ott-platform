import axios from "axios";
import Card from "../../components/Card/Card";
import "./WatchLater.css";
import { useEffect, useState } from "react";

const WatchLater = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/movies/watch-later", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      })
      .then((response) => {
        setBookmarkedMovies(response.data.watchLater);
      })
      .catch((error) => {
        console.error("Error fetching Watch Later movies:", error);
      });
  }, []);
  // console.log(bookmarkedMovies);

  return (
    <div className="watch-later">
      <div className="container watch-later-container">
        <div className="watch-later-head">
          <h1 className="watch-later-title">Your List</h1>
        </div>
        <div className="watch-later-grid">
          {bookmarkedMovies.length > 0 ? (
            bookmarkedMovies.map((movie) => (
              <Card
                key={movie.movieId} // Use a unique identifier instead of index
                thumbnail={movie.thumbnail}
                title={movie.title}
                description={movie.description}
                movieId={movie.movieId}
              />
            ))
          ) : (
            <p>No movies in your Watch Later list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;