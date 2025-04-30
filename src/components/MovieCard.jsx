import React from 'react';  
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  rerurn (
    <div className='movie-card'>
      <img src="{movie.poster}" alt="{movie.title} className='movie-poster'" />
      <div className='movie-info'>
        <h2 className='movie-title'>{movie.title}</h2>
        <p className='movie-description'>{movie.description}</p>
        <p className='movie-genre'>{movie.genre}</p>
        <p className='movie-showtime'>Showtime: {movie.showtime}</p>
      </div>
    </div>
  );
};

export default MovieCard;