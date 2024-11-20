import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, } from "@mui/material";

const Try = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  // // Generate and send verification code
  // const handleSendCode = () => {
  //   const generatedCode = Math.floor(100000 + Math.random() * 900000); // Random 6-digit code
  //   setVerificationCode(generatedCode);
  //   alert(`Verification code sent to: ${email}\nCode: ${generatedCode}`); // Simulate email sending
  //   setDialogOpen(true); // Open the verification dialog
  // };

  const handleSendCode = async () => {
    try {
      const response = await fetch("http://none2.pythonanywhere.com/api/send-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Send email as POST data
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setVerificationCode(data.code); // Optional: Store for local verification
        setSnackbar({ open: true, message: "Verification code sent to your email!", severity: "success" });
        setDialogOpen(true); // Open verification dialog
      } else {
        setSnackbar({ open: true, message: data.error || "Failed to send verification code", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error occurred while sending the code", severity: "error" });
    }
  };

  
  // Handle code verification
  const handleVerify = () => {
    if (userInput === verificationCode.toString()) {
      setSnackbar({ open: true, message: "Accepted!", severity: "success" });
    } else {
      setSnackbar({ open: true, message: "Not Match!", severity: "error" });
    }
    setDialogOpen(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Email Verification</h1>
      <TextField
        label="Enter Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendCode}
        disabled={!email}
      >
        Send Verification Code
      </Button>

      {/* Verification Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Verify Code</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Verification Code"
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
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
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Try;
