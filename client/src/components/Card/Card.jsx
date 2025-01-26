import PropTypes from "prop-types";
import "./Card.css";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import { useBookmarks } from "../../context/BookmarkContext";

const Card = ({ thumbnail, title, description, action, date }) => {
  const { bookmarkedMovies, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarkedMovies.some((movie) => movie.title === title);
  const navigate = useNavigate();

  const toggleBookmark = (event) => {
    event.stopPropagation();
    if (isBookmarked) {
      removeBookmark({ thumbnail, title, description });
    } else {
      addBookmark({ thumbnail, title, description });
    }
  };

  const handleCardClick = () => {
    navigate("/movie-details", {
      state: { title, description, thumbnail },
    });
  };

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
          title={isBookmarked ? "Remove from Watch Later" : "Add to Watch Later"}
        >
          {isBookmarked ? <IoBookmarkSharp /> : <IoBookmarkOutline />}
        </button>
        {action && <div className="card-action">{action}</div>}
      </div>
    </div>
  );
};

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.node,
  date: PropTypes.string,
};

export default Card;