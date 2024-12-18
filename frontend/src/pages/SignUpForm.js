import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const SignUpForm = ({ startDate, endDate, roomName, perDayCost }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [userInput, setUserInput] = useState("");
  const [amount, setAmount] = useState(0);

  const [paymentDashboard, setPaymentDashboard] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const paypalSubmit = async () => {
    if (endDate === null) {
      endDate = startDate;
    }
    let nights = countDays(startDate, endDate);
    if (nights === 0) {
      nights = 1;
    }

    if (!email || !amount) {
      alert("Please provide email and amount!");
      return;
    }
    setLoading(true);

    try {
      // Call backend API to create the payment
      const response = await axios.post('https://none2.pythonanywhere.com/api/api/create-payment-paypal/', {
        email,
        amount,
      });

      if (response.data.approval_url) {
        // Redirect to PayPal approval URL
        window.location.href = response.data.approval_url;
      } else {
        alert("Payment creation failed");
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('There was an error with the payment process.');
    } finally {
      setLoading(false);
    }
  };

  const europeanCountries = [
    "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", 
    "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 
    "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", 
    "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", 
    "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", 
    "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", 
    "Poland", "Portugal", "Romania", "San Marino", "Serbia", "Slovakia", 
    "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", 
    "United Kingdom", "Vatican City"
  ];


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
    setAmount(night * perDayCost);
    if (userInput === verificationCode.toString()) {
      // setFlag(true);
      setSnackbar({
        open: true,
        message: "Verification Successful!",
        severity: "success",
      });

      setPaymentDashboard(true);
      // setOpen(true);
      // Trigger booking submission after successful verification
      //submitBooking(); // Call this function after setting the flag
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
    if(endDate===null){
      endDate = startDate;
    }
    let nights = countDays(startDate, endDate);
    if(nights===0){
      nights = 1;
    }
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
        //navigate("/room-book");
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

  const handlePayment = async () => {
    if (endDate === null) {
      endDate = startDate;
    }
    let nights = countDays(startDate, endDate);
    if (nights === 0) {
      nights = 1;
    }
  
    if (!stripe || !elements) return;
  
    const cardElement = elements.getElement(CardElement);
  
    try {
      const response = await axios.post("https://none2.pythonanywhere.com/api/api/create-payment-intent/", {
        amount: nights * perDayCost * 100, 
        currency: "eur",
      });
  
      const { client_secret } = response.data;
  
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (result.error) {
        setSnackbar({
          open: true,
          message: result.error.message,
          severity: "error",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        setSnackbar({
          open: true,
          message: "Payment successful!",
          severity: "success",
        });
        setOpen(false); 
        submitBooking();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Payment failed. Please try again.",
        severity: "error",
      });
      console.error(error);
    }
  };
  
  if(endDate===null){
    endDate = startDate;
  }
  let night = countDays(startDate, endDate);
  if(night===0){
    night = 1;
  }

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
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Land/Region</InputLabel>
              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                label="Land/Region"
              >
                {europeanCountries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

      {/* payment dashboard */}
      <Dialog open={paymentDashboard} onClose={() => setPaymentDashboard(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Method</DialogTitle>
        <DialogContent>
          {/* <div>
            <Button onClick={() => setOpen(true)} variant="contained" >
                Stripe
            </Button>
            <Button variant="contained" >
                Paypal
            </Button>
          </div> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              gap: 2,
            }}
          >
            <Button  onClick={() => setOpen(true)} variant="contained">Stripe</Button>
            <Button onClick={() => setPaypal(true)} variant="contained">Paypal</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDashboard(false)} >Cancel</Button>
        </DialogActions>
      </Dialog>



      {/* Payment Dialog stripe */}
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogContent>
          <div>
            <CardElement options={{ hidePostalCode: true }} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary" disabled={!stripe}>
            Pay € {night * perDayCost}
          </Button>
        </DialogActions>
      </Dialog>


      

        {/* Popup for PayPal Payment */}
        <Dialog open={paypal} onClose={() => setPaypal(false)}>
          <DialogTitle>Enter Payment Details</DialogTitle>
          <DialogContent>
            <TextField
              label="Recipient Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              value={amount}
              fullWidth
              margin="normal"
              type="number"
              InputProps={{
                readOnly: true,  // Makes the field read-only
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaypal(false)} color="primary">Cancel</Button>
            <Button onClick={paypalSubmit} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>

        {/* PayPal Script Provider */}
      <PayPalScriptProvider
        options={{
          "client-id": "YOUR_PAYPAL_CLIENT_ID",  // Use your PayPal Client ID
          "currency": "USD", // Set the currency if needed
        }}
      >
        {/* Render PayPal Buttons for Payment */}
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,  // Dynamic amount from the state
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Payment Successful!"); // You can handle success here
              setPaypal(false);  // Close the popup after payment
              submitBooking();
            });
          }}
          onError={(err) => {
            console.error("PayPal error", err);
            alert("An error occurred during the payment process.");
          }}
        />
      </PayPalScriptProvider>

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
