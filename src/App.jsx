import React from 'react';
import MovieList from './components/MovieList';
import movies from './data/movies';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">Cinema Booking</h1>
      </header>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;