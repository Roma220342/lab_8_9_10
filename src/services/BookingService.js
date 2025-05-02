const BookingService = {
    // Отримати заброньовані місця для фільму за його ID
    getBookingsByMovieId(movieId) {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
      return bookings[movieId] || [];
    },
  
    // Зберегти бронювання
    saveBooking(movieId, seats, userData) {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
      const newBooking = {
        seats,
        user: userData,
        timestamp: new Date().toISOString(),
      };
  
      if (!bookings[movieId]) {
        bookings[movieId] = [];
      }
  
      bookings[movieId].push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      return true;
    },
  };
  
  export default BookingService;