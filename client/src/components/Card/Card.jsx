import { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import "./Card.css";

const Card = ({ thumbnail, title, description, movieId, action, date }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/movies/watch-later", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const movieIds = new Set(
          response.data.watchLater.map((movie) => movie.movieId)
        );
        setBookmarkedMovies(movieIds);
      })
      .catch((error) =>
        console.error("Error fetching Watch Later movies:", error)
      );
  }, []);

  const isBookmarked = bookmarkedMovies.has(movieId);

  const toggleBookmark = useCallback(
    async (event) => {
      event.stopPropagation();

      try {
        const endpoint = isBookmarked
          ? "http://localhost:3000/api/movies/watch-later/remove"
          : "http://localhost:3000/api/movies/watch-later/add";

        const response = await axios.post(
          endpoint,
          { movieId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setBookmarkedMovies((prev) => {
            const updated = new Set(prev);
            isBookmarked ? updated.delete(movieId) : updated.add(movieId);
            return updated;
          });
        }
      } catch (error) {
        console.error(
          `Error ${isBookmarked ? "removing" : "adding"} movie:`,
          error
        );
      }
    },
    [isBookmarked, movieId]
  );

  const removeFromHistory = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/movies/watch-history/remove",
        { movieId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response)

      // if (response.status === 200) {
      //   console.log("Movie removed from watch history");
      // } else {
      //   console.error("Error removing movie from watch history:", response.data.message);
      // }
    } catch (error) {
      console.error("Error removing movie from watch history:", error);
    }
  };

  const handleCardClick = useCallback(() => {
    navigate("/movie-details", {
      state: { title, description, thumbnail, movieId },
    });
  }, [navigate, title, description, thumbnail, movieId]);

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={thumbnail} alt="Thumbnail" className="card-thumbnail" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {date && <p className="card-date">Watched on: {date}</p>}
      </div>
      <div className="card-footer">
        <button
          className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
          onClick={toggleBookmark}
          title={
            isBookmarked ? "Remove from Watch Later" : "Add to Watch Later"
          }
        >
          {isBookmarked ? <IoBookmarkSharp /> : <IoBookmarkOutline />}
        </button>
        {location.pathname === "/watch-history" && (
          <button
            className="watchHistory-remove-button"
            title="Remove from History"
            onClick={removeFromHistory}
          >
            <CiCircleRemove />
          </button>
        )}

        {action && <div className="card-action">{action}</div>}
      </div>
    </div>
  );
};

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  movieId: PropTypes.string.isRequired,
  action: PropTypes.node,
  date: PropTypes.string,
};

export default memo(Card);