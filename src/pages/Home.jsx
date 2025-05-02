import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import movies from '../data/movies';
import '../App.css'; // Використовуємо стилі з App.css

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук за назвою фільму..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Home;