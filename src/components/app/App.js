import * as React from 'react';
import logo from './../../logo.svg';
import './App.css';
import { Button, Paper, Typography, Container } from '@mui/material/';
import Navbar from '../Navbar'



function App({theme}) {
  return (
    <Container maxWidth="sm" className="App">
      <Paper>
      <Navbar theme={theme}/>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App + Material-UI
        </Typography>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
      </Paper>
    </Container>
  );
}
export default App;