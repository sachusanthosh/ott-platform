import PropTypes from "prop-types";

const Carousel = ({ title, description, poster }) => (
  <div>
    <div className="carousel-item active">
      <img src={poster} className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired, 
};

export default Carousel;
