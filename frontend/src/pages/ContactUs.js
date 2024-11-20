import React from 'react';
import { Box, Typography, Grid, Paper, Button, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <>
    <Navbar />
    

    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://source.unsplash.com/1920x1080/?hotel,architecture) no-repeat center center/cover`,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: '900px',
          width: '100%',
          padding: '3rem',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#333',
        }}
      >
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#2c3e50',
            }}
          >
            Kontaktieren Sie Uns
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Wir freuen uns, von Ihnen zu hören! Finden Sie unten unsere Details oder senden Sie uns
            direkt eine Nachricht.
          </Typography>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Accommodation Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
              Über Die Unterkunft
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
              Unser Zimmer befindet sich in einer ruhigen Gegend von Chemnitz. Egal, ob Sie mit
              öffentlichen Verkehrsmitteln oder dem Auto anreisen – die Verkehrsanbindung ist ideal.
              Kostenlose Parkplätze stehen Ihnen direkt vor der Unterkunft zur Verfügung.
            </Typography>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
              Kontaktdetails
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOnIcon sx={{ marginRight: '10px', color: '#3498db' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                Casparistraße 1, 09126 Chemnitz
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <AccessTimeIcon sx={{ marginRight: '10px', color: '#3498db' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                Check-in: 24/7
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon sx={{ marginRight: '10px', color: '#3498db' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                adam.david@web.de
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ marginRight: '10px', color: '#3498db' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                +49 17663265933
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Action Button */}
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#3498db',
              padding: '10px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#2980b9',
              },
            }}
          >
            Nachricht Senden
          </Button>
        </Box>
      </Paper>
    </Box>


    <Footer />
    </>
    
  );
};

export default ContactUs;
