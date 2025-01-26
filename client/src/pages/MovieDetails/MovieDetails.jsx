import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add logic here to handle "Watch Later" state in backend or global state.
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
                onClick={(e) => e.preventDefault()}
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
