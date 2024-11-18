import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

const AdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const years = [2022, 2023, 2024, 2025];
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('https://none2.pythonanywhere.com/api/api/bookings/all/');
        console.log(response.data); // Check if the data structure is as expected
        setReservations(response.data.bookings || []);  // Access the 'bookings' array
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter the reservations based on selected year and month
  const filteredReservations = reservations.filter(reservation => {
    const startDate = new Date(reservation.start_date);
    // const endDate = new Date(reservation.end_date);

    if (selectedYear && selectedMonth) {
      return (
        startDate.getFullYear() === selectedYear &&
        startDate.getMonth() + 1 === selectedMonth
      );
    }

    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ mt: '2%', ml: '2%', mr: '2%' }}>
      <Typography variant="h5" gutterBottom>
        Reservation Statements
      </Typography>
      <Typography variant="body1">
        Here you can see all reservation details that have been included in your invoice.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" onClick={handlePrint} sx={{ m: 1 }}>
        Print this page
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }} id="printableTable">
        <Table aria-label="reservation table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Book Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Guest Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Room Nights</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Final Amount (EUR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{`${reservation.first_name || ''} ${reservation.last_name || ''}`}</TableCell>
                <TableCell>{reservation.start_date}</TableCell>
                <TableCell>{reservation.end_date}</TableCell>
                <TableCell>{reservation.night_count}</TableCell>
                <TableCell>{reservation.total_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CSS for full-page print in portrait orientation */}
      <style jsx global>{`
        @media print {
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            -webkit-print-color-adjust: exact;
          }
          #printableTable {
            margin: 0;
            width: 100%;
            height: auto;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}</style>

    </Box>
  );
};

export default AdminPanel;
