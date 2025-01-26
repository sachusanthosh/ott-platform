import thumbnails from "../../images/Thumbnails";
import Card from "../../components/Card/Card";
import "./WatchHistory.css";

const WatchHistory = () => {
  const movies = [
    {
      thumbnail: thumbnails.movie1,
      title: "Movie 1",
      description: "An epic adventure.",
    },
    {
      thumbnail: thumbnails.movie2,
      title: "Movie 2",
      description: "A thrilling drama.",
    },
    {
      thumbnail: thumbnails.movie3,
      title: "Movie 3",
      description: "A heartwarming story.",
    },
    {
      thumbnail: thumbnails.movie4,
      title: "Movie 4",
      description: "A heartwarming story.",
    },
  ];

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
