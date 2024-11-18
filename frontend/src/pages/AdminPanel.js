import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

const AdminPanel = () => {
  const reservations = [
    {
      bookNumber: "4589154859",
      guestName: "Miroslav Friedl",
      checkIn: "2024-09-30",
      checkOut: "2024-10-04",
      roomNights: 4,
      comm: 12,
      result: "Stayed",
      originalAmount: "€ 176.25",
      finalAmount: "€ 176.25",
      paymentCharge: "€ 2.59",
      commissionAmount: "€ 21.15",
      disputeAmount: false,
      remarks: ""
    },
    {
      bookNumber: "4652318647",
      guestName: "Mayle Mayle",
      checkIn: "2024-10-09",
      checkOut: "2024-10-14",
      roomNights: 5,
      comm: 12,
      result: "Stayed",
      originalAmount: "€ 203.66",
      finalAmount: "€ 203.66",
      paymentCharge: "€ 2.99",
      commissionAmount: "€ 24.44",
      disputeAmount: false,
      remarks: ""
    },
    // Add more reservation data here...
  ];

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

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter reservations based on selected year and month
  const filteredReservations = reservations.filter(reservation => {
    const checkInDate = new Date(reservation.checkIn);
    return (
      checkInDate.getFullYear() === selectedYear &&
      checkInDate.getMonth() + 1 === selectedMonth
    );
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ mt: '2%', ml: '2%', mr:'2%' }}>
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

      {/* <Button variant="contained" sx={{ m: 1 }}>Download XLS</Button>
      <Button variant="contained" sx={{ m: 1 }}>Download CSV</Button> */}
      <Button variant="contained" onClick={handlePrint} sx={{ m: 1 }}>Print this page</Button>
      
      <TableContainer component={Paper} sx={{ mt: 3 }} id="printableTable">
        <Table aria-label="reservation table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Book Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Guest Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Room Nights</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Comm. %</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Original Amount (EUR)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Final Amount (EUR)</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold' }}>Payment Charge</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Commission Amount (EUR)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Dispute Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Remarks</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.bookNumber}>
                <TableCell>{reservation.bookNumber}</TableCell>
                <TableCell>{reservation.guestName}</TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>{reservation.roomNights}</TableCell>
                <TableCell>{reservation.comm}</TableCell>
                <TableCell>{reservation.result}</TableCell>
                <TableCell>{reservation.originalAmount}</TableCell>
                <TableCell>{reservation.finalAmount}</TableCell>
                {/* <TableCell>{reservation.paymentCharge}</TableCell>
                <TableCell>{reservation.commissionAmount}</TableCell>
                <TableCell>
                  <Checkbox checked={reservation.disputeAmount} />
                </TableCell>
                <TableCell>{reservation.remarks}</TableCell> */}
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
