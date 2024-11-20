import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5', // Light gray background for full body
        minHeight: '100vh', 
        padding: '3rem 1rem' 
      }}
    >
      {/* Title Section */}
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom 
        sx={{
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#333'
        }}
      >
        About Us
      </Typography>

      {/* Introduction Section */}
      <Typography 
        variant="body1" 
        align="center" 
        sx={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto',
          color: '#555',
          marginBottom: '3rem',
        }}
      >
        Welcome to <strong>Your Site Name</strong>, where hospitality meets elegance. Our mission is to offer 
        exceptional stays tailored to your comfort and needs. Whether you're visiting for business or leisure, 
        we ensure a memorable experience with modern amenities and unparalleled service.
      </Typography>

      {/* Our Rooms Section */}
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: '2rem', 
          color: '#333' 
        }}
      >
        Our Rooms
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          {
            title: "Tailored Comfort",
            description: "Relax in our cozy rooms, designed to provide a sanctuary of comfort after a long day.",
            image: "https://i.ibb.co.com/L8tdzk7/IMG-20241112-WA0033.jpg" // Replace with actual room image
          },
          {
            title: "Modern Amenities",
            description: "Enjoy features like high-speed Wi-Fi, luxurious bedding, and climate control.",
            image: "https://i.ibb.co.com/423pxtz/IMG-20241112-WA0013.jpg" // Replace with actual room image
          },
          {
            title: "Scenic Views",
            description: "Wake up to breathtaking views that make your stay even more special.",
            image: "https://i.ibb.co.com/5xXKV32/IMG-20241112-WA0019.jpg" // Replace with actual room image
          }
        ].map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4} sx={{ borderRadius: '10px' }}>
              <CardMedia
                component="img"
                height="140"
                image={room.image}
                alt={room.title}
              />
              <CardContent>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  {room.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {room.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Why Choose Us Section */}
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          marginTop: '4rem', 
          marginBottom: '2rem', 
          color: '#333' 
        }}
      >
        Why Choose Us?
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          {
            title: "Hassle-Free Booking",
            description: "Book your stay in just a few clicks with our user-friendly platform."
          },
          {
            title: "Affordable Luxury",
            description: "Experience the perfect blend of luxury and affordability during your stay."
          },
          {
            title: "24/7 Support",
            description: "Our dedicated team is here to assist you round the clock."
          }
        ].map((reason, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4} sx={{ borderRadius: '10px', padding: '1rem' }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  {reason.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {reason.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Footer />
    </>
    
  );
};

export default AboutUs;
