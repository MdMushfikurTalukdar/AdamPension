import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 

const SignUpForm = ({ startDate, endDate, roomName, perDayCost }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [userInput, setUserInput] = useState("");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate(); 

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setVerificationCode(code);
    return code;
  };

  const sendVerificationEmail = async () => {
    setError("");
    setMessage("");

    try {
      const code = generateVerificationCode();
      const response = await axios.post(
        "https://none2.pythonanywhere.com/api/api/email/verify/",
        {
          email: email.trim(),
          code: code,
        }
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const countDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const days = timeDifference / (1000 * 3600 * 24);
    return days;
  };

  const handleVerify = () => {
    if (userInput === verificationCode.toString()) {
      setFlag(true);
      setSnackbar({
        open: true,
        message: "Verification Successful!",
        severity: "success",
      });

      // Trigger booking submission after successful verification
      submitBooking(); // Call this function after setting the flag
    } else {
      setSnackbar({
        open: true,
        message: "Verification Failed! Code does not match.",
        severity: "error",
      });
    }
    setDialogOpen(false); 
  };
  //api/email/successfull-message
  const successfullMessage = async () => {
    setError("");
    setMessage("");

    try {
      const code = generateVerificationCode();
      const response = await axios.post(
        "https://none2.pythonanywhere.com/api/api/email/successfull-message",
        {
          email: email.trim(),
          code: code,
        }
      );

      setEmail("");
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const submitBooking = async () => {
    console.log(endDate);
    if(endDate===null){
      endDate = startDate;
    }
    console.log(endDate);
    let nights = countDays(startDate, endDate);
    console.log(nights);
    if(nights===0){
      nights = 1;
    }
    console.log(nights);
    const bookingData = {
      first_name: firstName || null,
      last_name: lastName || null,
      email: email || null,
      phone: phone || null,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      room_name: roomName,
      night_count: nights,
      total_cost: nights * perDayCost,
    };

    try {
      const response = await fetch(
        "https://none2.pythonanywhere.com/api/api/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFirstName("");
        setLastName("");
        // setEmail("");
        setPhone("");
        setSnackbar({
          open: true,
          message: "Booking saved successfully!",
          severity: "success",
        });
        console.log("Booking saved successfully:", data);

        successfullMessage();

        // Navigate to /room-book page
        navigate("/room-book");
      } else {
        const errorData = await response.json();
        setSnackbar({
          open: true,
          message:
            errorData.message || "Failed to save booking. Please try again.",
          severity: "error",
        });
        console.error("Error saving booking:", errorData);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error. Please check your connection.",
        severity: "error",
      });
      console.error("Network or server error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Send the verification email and wait for the user to verify
    await sendVerificationEmail();
    setDialogOpen(true);
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
            <TextField
              label="Land/Region"
              type="tel"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              fullWidth
            >
              Send Verification Code
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Verify Code</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Verification Code"
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{marginTop:'5px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleVerify} color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default SignUpForm;
