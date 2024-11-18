import { useEffect, useState } from 'react';

function Try() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch data from PHP endpoint
    fetch('http://admas.000.pe/get_bookings.php?room_name=Double%20Bed%20Room&i=1')
      .then(response => response.json())  // Assuming the endpoint returns JSON data
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div>
      <h1>Bookings for Double Bed Room</h1>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>{`Booked by: ${booking.booked_by}, From: ${booking.start_date} To: ${booking.end_date}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Try;
