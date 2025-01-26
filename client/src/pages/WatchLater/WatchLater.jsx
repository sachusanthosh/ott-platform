import Card from '../../components/Card/Card';
import "./WatchLater.css";
import { useBookmarks } from "../../context/BookmarkContext";

const WatchLater = () => {
  const { bookmarkedMovies } = useBookmarks();

  return (
    <div className="watch-later">
      <div className="container watch-later-container">
        <div className="watch-later-head">
          <h1 className="watch-later-title">Your List</h1>
        </div>
        <div className="watch-later-grid">
          {bookmarkedMovies.length > 0 ? (
            bookmarkedMovies.map((movie, index) => (
              <Card
                key={index}
                thumbnail={movie.thumbnail}
                title={movie.title}
                description={movie.description}
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