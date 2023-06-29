import * as React from 'react';
import logo from './../../logo.svg';
import './App.css';
import { Button, Paper, Typography, Container } from '@mui/material/';
// import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';

// const theme = createTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some CSS that accesses the theme
//   }
// });
// return <ThemeProvider theme={theme}>{children}</ThemeProvider>

function App() {
  return (
    <Container maxWidth="sm" className="App">
      <Paper>
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