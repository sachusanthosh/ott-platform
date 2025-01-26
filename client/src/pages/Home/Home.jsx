import Card from "../../components/Card/Card";
import thumbnails from "../../images/Thumbnails";
import "./Home.css";
const Home = () => {
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
    <div className="home">
      <div className="container home-container">
        <div className="home-head">
          <h1 className="home-title">Discover Movies</h1>
        </div>
        <div className="home-grid">
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

export default Home;
