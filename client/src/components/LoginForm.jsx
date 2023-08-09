import React, { useState, useContext } from 'react';
import * as yup from "yup";
import UserContext from './Pages/UserContext';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from 'formik-mui'
import { Typography, FormControl, Box, Button, ListItem, List, ListItemText, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";
import { FiberPin } from '@material-ui/icons';

function LoginForm({navigate}) {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const validationSchema = yup.object().shape({
    username: yup.string('Please enter your username'),
    password: yup.string('Please enter your password')
  });

    


  // if (user) {
  //   navigate('/home')
  // }

  return (
    <section style={{display: "flex", justifyContent: "center"}}>
      <Box
      display="flex" 
      alignItems="center"
      justifyContent="center"
      sx={{width: "100vw"}}>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values)
          fetch('/api/login', {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(values)
          })
            .then(res => {
              if (res.ok) {
                res.json().then(user => {
                  console.log(user)
                  setUser(user);
                  navigate("/home");
                });
              } else {
                res.json().then(error => setError(error.message));
              }
            });
        }}
      >
        
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box 
            marginBottom={1}
            padding={2}>

              <Typography>Username:</Typography>
              <Field
              sx={{backgroundColor: "white"}}
              component={TextField}
              type="text" 
              name="username"
              placeholder="Username" 
              variant='outlined'
              size="small"
              /> 
              <ErrorMessage name="username" />
            </Box>

            <Box 
            marginBottom={2}
            padding={2}>
              <Typography>Password:</Typography>
              <Field
              size='small' 
              type="password" 
              name="password"
              variant="outlined" 
              label='Password'
              component={TextField}
              />
              <ErrorMessage name="password"  />
           </Box>

           <Box padding={2}>
           <Button type="submit"  variant="contained" color="primary"> Get Matchin'!</Button>
           </Box>
        </Form>
        )}
      </Formik>
      {error && (
        <Box marginTop={2}>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary={error} />
            </ListItem>
          </List>
        </Box>
      )}
      </Box>
    </section>
  );
}

export default LoginForm;
