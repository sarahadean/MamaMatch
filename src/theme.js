import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/';
// A custom theme for this app
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#B66551',
      light: '#C48373',
      dark: '#7F4638',
    },
    secondary: {
      main: '#3393CD',
      light: '#5BA8D7',
      dark: '#23668F',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#282c34',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '20px 10px',
        margin: '10px',
        backgroundColor: '#fff', // 5d737e
      },
    },
    MuiButton: {
      root: {
        margin: '5px',
      },
    },
  },
});
export default theme;