import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, TextField, TextareaAutosize, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/send-email', formData)
      .then((response) => {
        console.log(response.data);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to send email');
      });
  };

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
        <Typography variant="h4" align="center" gutterBottom>Get in Touch</Typography>
        <Paper style={{ padding: 20 }}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextareaAutosize
              minRows={4}
              name="message"
              placeholder="Enter message"
              style={{ width: '100%', marginBottom: 20 }}
              onChange={handleChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Enter your name" name="name" onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Enter your email" name="email" onChange={handleChange} />
              </Grid>
            </Grid>
            <TextField fullWidth label="Enter Subject" name="subject" style={{ marginTop: 20 }} onChange={handleChange} />
            <Button variant="contained" color="primary" style={{ marginTop: 20 }} type="submit">Send</Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Contact;
