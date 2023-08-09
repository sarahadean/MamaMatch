import { createTheme } from '@mui/material'
import styled from 'styled-components'

// Forms, inputs

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;


const theme = createTheme({

  palette: {
    type: 'light',
    primary: {
      main: '#fbc0ba',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#eae017',
    },
  }

});
export default theme;