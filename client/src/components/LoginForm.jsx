import React, { useState, useContext } from 'react';
import * as yup from "yup";
import UserContext from './Pages/UserContext';
import { Formik, Field, ErrorMessage } from "formik";
import { TextField, Typography, FormControl, Box, Button, ListItem, List, ListItemText, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";

function LoginForm({navigate}) {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string()
  });



  // if (user) {
  //   navigate('/home')
  // }

  return (
    <section>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={schema}
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
          <form onSubmit={handleSubmit}>
            <FormControl>
            <Box marginBottom={1}
            padding={2}>
              <Typography>Username:</Typography>
              <Field 
              type="text" 
              name="username" 
              size='small'/> 
              <ErrorMessage name="username" />
            </Box>
            <Box marginBottom={2}
            padding={2}>
              <Typography>Password:</Typography>
              <Field size='small' 
              type="password" 
              name="password" 
              placeholder='password'
    
              />
              <ErrorMessage name="password"  />
           </Box>

           <Box padding={2}>
           <Button type="submit"  variant="contained" color="primary"> Get Matchin'!</Button>
           </Box>
        
        </FormControl>
        </form>
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
    </section>
  );
}

export default LoginForm;
