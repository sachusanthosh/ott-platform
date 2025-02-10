import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleClick = async () => {
    try {

      await axios.post(
        "http://localhost:3000/api/movies/watch-history/remove",
        { movieId: state.movieId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      await axios.post(
        "http://localhost:3000/api/movies/watch-history/add",
        { movieId: state.movieId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("Movie added to watch history");
    } catch (error) {
      console.error("Error updating watch history:", error);
    }
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <div className="details-content">
          <img
            src={state.thumbnail}
            alt={state.title}
            className="details-thumbnail"
          />
          <div className="details-info">
            <h1 className="details-title">{state.title}</h1>
            <p className="details-description">{state.description}</p>
            <p className="details-meta">
              Release Date: {state.releaseDate || "Unknown"}
            </p>
            <div className="details-actions">
              <button
                className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
                onClick={toggleBookmark}
                title={
                  isBookmarked
                    ? "Remove from Watch Later"
                    : "Add to Watch Later"
                }
              >
                {isBookmarked ? <IoBookmarkSharp /> : <IoBookmarkOutline />}
              </button>
              <a
                href="/watch-now"
                className="watch-now-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;