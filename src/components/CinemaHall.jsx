import React, { useState } from 'react';
import './csss/CinemaHall.css'; 
const CinemaHall = () => {
  // Імітація місць у залі (5 рядів, 10 місць у кожному)
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

  const handleSeatClick = (row, col) => {
    if (seats[row][col].isBooked) return; // Не можна вибрати заброньоване місце

    const newSeats = seats.map((rowSeats, r) =>
      rowSeats.map((seat, c) => {
        if (r === row && c === col) {
          return { ...seat, isSelected: !seat.isSelected };
        }
        return seat;
      })
    );

    setSeats(newSeats);

    // Оновлення списку вибраних місць
    const seatId = `${row + 1}-${col + 1}`;
    if (newSeats[row][col].isSelected) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
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
      </div>
    </div>
  );
};

export default CinemaHall;