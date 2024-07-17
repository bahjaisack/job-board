import React from 'react';
import { NavLink } from 'react-router-dom';
import aboutImg from '../img/about.avif';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AppBar, Toolbar, Typography, Button, Container, Grid, TextField, Paper, Box } from '@mui/material';

function About() {
  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Job Board
          </Typography>
          <Button color="inherit" component={NavLink} to="/">Home</Button>
          <Button color="inherit" component={NavLink} to="/about">About</Button>
          <Button color="inherit" component={NavLink} to="/contact">Contact</Button>
          <Button variant="contained" color="primary" component={NavLink} to="/roless">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: 40 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={aboutImg} alt="About us" style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              We Build Lasting Relationships Between Candidates & Businesses
            </Typography>
            <Typography variant="body1" paragraph>
              The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes.
            </Typography>
            <Typography variant="body1" paragraph>
              Placeholder text commonly used.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Box style={{ backgroundColor: '#f8f8f8', marginTop: 40, padding: 20 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">FindJob</Typography>
              <Typography variant="body2">The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</Typography>
              <Box style={{ display: 'flex', marginTop: 10 }}>
                <a className='color' href="#"><IoLogoInstagram /></a>
                <a className='color' href="#"><FaFacebookF /></a>
                <a className='color' href="#"><FaXTwitter /></a>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Useful links</Typography>
              <Typography variant="body2">Design & creatives</Typography>
              <Typography variant="body2">Accounting</Typography>
              <Typography variant="body2">Programming</Typography>
              <Typography variant="body2">Architecture</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Subscribe Newsletter</Typography>
              <Typography variant="body2">Subscribe newsletter to get updates about new jobs.</Typography>
              <TextField fullWidth label="Enter your email" style={{ marginTop: 10, marginBottom: 10 }} />
              <Button variant="contained" color="primary">Subscribe</Button>
            </Grid>
          </Grid>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: 20 }}>Copyright &copy;2024 All rights reserved</Typography>
        </Container>
      </Box>
    </>
  );
}

export default About;
