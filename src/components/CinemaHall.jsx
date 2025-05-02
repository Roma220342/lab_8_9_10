import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CinemaHall.css';

const CinemaHall = ({ movieId }) => {
  // Ініціалізація місць
  const initialSeats = Array(5)
    .fill()
    .map(() =>
      Array(10).fill({
        isBooked: false,
        isSelected: false,
      })
    );

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  // Завантаження заброньованих місць
  useEffect(() => {
    const bookings = BookingService.getBookingsByMovieId(movieId);
    const bookedSeats = bookings.flatMap((booking) => booking.seats);

    const updatedSeats = initialSeats.map((row, rowIndex) =>
      row.map((seat, colIndex) => {
        const seatId = `${rowIndex + 1}-${colIndex + 1}`;
        return {
          ...seat,
          isBooked: bookedSeats.includes(seatId),
        };
      })
    );

    setSeats(updatedSeats);
  }, [movieId]);

  // Обробка вибору місця
  const handleSeatClick = (row, col) => {
    if (seats[row][col].isBooked) return;

    const newSeats = seats.map((rowSeats, r) =>
      rowSeats.map((seat, c) => {
        if (r === row && c === col) {
          return { ...seat, isSelected: !seat.isSelected };
        }
        return seat;
      })
    );

    setSeats(newSeats);

    const seatId = `${row + 1}-${col + 1}`;
    if (newSeats[row][col].isSelected) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    }
  };

  // Обробка зміни полів форми
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Валідація форми
  const validateForm = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = "Ім'я є обов'язковим";
    if (!userData.phone) newErrors.phone = "Телефон є обов'язковим";
    if (!userData.email) {
      newErrors.email = "Емейл є обов'язковим";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Емейл має бути у правильному форматі";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обробка бронювання
  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error('Виберіть принаймні одне місце');
      return;
    }
    setShowForm(true);
  };

  // Обробка відправки форми
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      BookingService.saveBooking(movieId, selectedSeats, userData);
      toast.success('Бронювання успішно збережено!');
      setShowForm(false);
      setSelectedSeats([]);
      setUserData({ name: '', phone: '', email: '' });

      // Оновлення заброньованих місць
      const bookings = BookingService.getBookingsByMovieId(movieId);
      const bookedSeats = bookings.flatMap((booking) => booking.seats);
      const updatedSeats = seats.map((row, rowIndex) =>
        row.map((seat, colIndex) => {
          const seatId = `${rowIndex + 1}-${colIndex + 1}`;
          return {
            ...seat,
            isBooked: bookedSeats.includes(seatId),
            isSelected: false,
          };
        })
      );
      setSeats(updatedSeats);
    }
  };

  return (
    <div className="cinema-hall">
      <h2>Виберіть місця</h2>
      <div className="screen">Екран</div>
      <div className="seats-grid">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, colIndex) => (
              <div
                key={colIndex}
                className={`seat ${seat.isBooked ? 'booked' : ''} ${
                  seat.isSelected ? 'selected' : ''
                }`}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <h3>Вибрані місця:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає вибраних місць'}</p>
        {selectedSeats.length > 0 && (
          <button className="booking-button" onClick={handleBooking}>
            Забронювати
          </button>
        )}
      </div>

      {showForm && (
        <div className="booking-form">
          <h3>Введіть дані для бронювання</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Ім'я:</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Телефон:</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Емейл:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <button type="submit" className="submit-button">
              Підтвердити бронювання
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Скасувати
            </button>
          </form>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CinemaHall;