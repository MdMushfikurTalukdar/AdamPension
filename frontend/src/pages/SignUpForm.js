import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const SignUpForm = ({ startDate, endDate, roomName, perDayCost}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const countDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const days = timeDifference / (1000 * 3600 * 24);
    return days;
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      
      const nights = countDays(startDate, endDate);

      const bookingData = {
          first_name: firstName || null,
          last_name: lastName || null,
          email: email || null,
          phone: phone || null,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
          room_name: roomName,
          night_count: nights,
          total_cost: (nights*perDayCost) ,
      };

      try {
          const response = await fetch("https://none2.pythonanywhere.com/api/api/bookings/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
          });

          if (response.ok) {
              const data = await response.json();
              setFirstName("");
              setLastName("");
              setEmail("");
              setPhone("");
              console.log("Booking saved successfully:", data);
          } else {
              const errorData = await response.json();
              setErrorMessage("Failed to save booking. Please try again.");
              console.error("Error saving booking:", errorData);
          }
      } catch (error) {
          setErrorMessage("Network error. Please check your connection.");
          console.error("Network or server error:", error);
      } finally {
          setIsLoading(false);
      }
  };
  
  
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SignUpForm;
