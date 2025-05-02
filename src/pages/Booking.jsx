import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import movies from '../data/movies';
import '../App.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div>Фільм не знайдено</div>;
  }

  return (
    <div>
      <h2>Бронювання квитків на "{movie.title}"</h2>
      <p>Сеанс: {movie.showtime}</p>
      <CinemaHall />
    </div>
  );
};

export default Booking;