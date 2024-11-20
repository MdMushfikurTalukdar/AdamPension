import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); 
    setVerificationCode(code);
    return code;
  };

  // Handle email input
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Send verification email
  const sendVerificationEmail = async () => {
    setError('');
    setMessage('');

    try {
      const code = generateVerificationCode();
    //   console.log(code);
      const response = await axios.post('http://none2.pythonanywhere.com/api/api/email/verify/', {
        email: email.trim(),
        code: code,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send verification email.');
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        <button onClick={sendVerificationEmail}>Send Verification Code</button>
      </div>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmailForm;
