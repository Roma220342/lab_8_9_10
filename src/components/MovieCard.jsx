import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-description">{movie.description}</p>
        <p className="movie-genre">Жанр: {movie.genre}</p>
        <p className="movie-showtime">Сеанс: {movie.showtime}</p>
        <Link to={`/booking/${movie.id}`} className="booking-button">
          Забронювати
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;