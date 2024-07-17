import { NavLink } from 'react-router-dom';
import img from '../img/header.jpeg';
import aboutImg from '../img/about.avif';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AppBar, Toolbar, Typography, Button, Container, Grid, TextField, TextareaAutosize, Paper, Box, Link } from '@mui/material';

function Home() {
  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: 'blue[500]' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Job Board
          </Typography>
          <Button color="inherit" component={NavLink} to="/">Home</Button>
          <Button color="inherit" component={NavLink} to="/about">About</Button>
          <Button color="inherit" component={NavLink} to="/contact">Contact</Button>
          <Button
  variant="contained"
  color="primary"
  component={NavLink}
  to="/roless"
  style={{
    marginLeft: '380px', // Adjust the margin left as needed
    backgroundColor: 'white',
    color: 'blue',
  }}
>
  Signin
</Button>
          <Button
  variant="contained"
  color="primary"
  component={NavLink}
  to="/login"
  style={{
    marginLeft: '12px', // Adjust the margin left as needed
    backgroundColor: 'white',
    color: 'blue',
  }}
>
  Login
</Button>

        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: 100, textAlign: 'center' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3">Searching for a job</Typography>
            <Typography variant="h4">Find Your <span style={{ color: 'blue' }}>Next Dream Job</span></Typography>
            <Typography variant="h4">Job that fits you</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={img} alt="Job search" style={{ width: '60%', maxWidth: '500px', height: '0%' }} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" style={{ marginTop: 200, textAlign: 'center' }}>
        <Typography variant="h2"><span style={{ color: 'blue' }}>1000+</span></Typography>
        <Typography variant="h4">Browse From Our Top Jobs</Typography>
        <Typography variant="body1">The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</Typography>
      </Container>

      <Container maxWidth="lg" style={{ marginTop: 280 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={aboutImg} alt="About us" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">We Build Lasting Relationships Between Candidates & Businesses</Typography>
            <Typography variant="body1">The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</Typography>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" style={{ marginTop: 240, textAlign: 'center' }}>
        <Typography variant="h4">Get in Touch</Typography>
        <Paper style={{ padding: 20 }}>
          <form noValidate autoComplete="off">
            <TextareaAutosize
              minRows={4}
              placeholder="Enter message"
              style={{ width: '100%', marginBottom: 20 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Enter your name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Enter your email" />
              </Grid>
            </Grid>
            <TextField fullWidth label="Enter Subject" style={{ marginTop: 20 }} />
            <Button variant="contained" color="primary" style={{ marginTop: 20 }}>Send</Button>
          </form>
        </Paper>
      </Container>

      <Box style={{ backgroundColor: '#f8f8f8', marginTop: 140, padding: 20 }}>
        <Container maxWidth="lg">
          <Grid container spacing={14}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">FindJob</Typography>
              <Typography variant="body2">The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</Typography>
              <Box style={{ display: 'flex', marginTop: 10 }}>
                <Link href="#" className='color'><IoLogoInstagram /></Link>
                <Link href="#" className='color' style={{ marginLeft: 10 }}><FaFacebookF /></Link>
                <Link href="#" className='color' style={{ marginLeft: 10 }}><FaXTwitter /></Link>
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

export default Home;
