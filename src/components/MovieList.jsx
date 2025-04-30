import React from "react";
import MovieCard from "./MovieCard";
import'./csss/MovieList.css'; // Importing CSS for styling

const MovieList = ({ movies }) => {
  return(
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;