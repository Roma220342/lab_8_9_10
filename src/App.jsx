import React from 'react';
import MovieList from './components/MovieList';
import movies from './data/movies';
import './App.css'; 
function App() {
  return (
    <div className="app">
      <h1>Кінотеатр</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;