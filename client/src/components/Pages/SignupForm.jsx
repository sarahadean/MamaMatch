import React, { useState, useContext } from 'react';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import UserContext from './UserContext';
import { TextField } from 'formik-mui';
import {Typography, Box, Button, ListItem, List, ListItemText, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";

function SignupForm({updateUser}) {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const toggleSignup = () => setSignup((prev) => !prev);

  const schema = yup.object().shape({
    name: yup.string('Please enter your name (you can change this later'),
    username: yup.string('Please create a username'),
    email: yup.string('Please enter your email address'),
    password: yup.string('Please enter your password'),
  
  })
  return (
    <>
    <Box
      display="flex" 
      alignItems="center"
      justifyContent="center"
      marginTop={5}
      sx={{width: "100vw"}}>

    <Formik
      initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
      }}
      validationSchema= {schema}
      onSubmit={(values, actions) => {
            fetch("/api/signup", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(values)
            })
            .then (res => {
                if(res.ok){
                    res.json().then((user) => {
                      console.log(user)
                      setUser(user)
                      navigate("/profile")
                      actions.resetForm()
                    });
                } else {
                  res.json().then(data => {
                    if (data && data.message) {
                      setError(data.message);
                    } else {
                      setError("An error occurred during signup.");
                    }
                  });
                }
              })
              .catch(error => {
                setError("An error occurred during signup.");
                console.error(error);
              });
          }}
          >
    
            {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
       
         <Typography>Name:</Typography>
            <Field 
            type="text" 
            name="name"
            component={TextField} />
            <ErrorMessage name="name" />
            
            <Typography>Username:</Typography>
            <Field
            type="text"
            name="username"
            component={TextField} 
          />

          <Typography>Email:</Typography>
            <Field 
            type="text"
            name="email"
            component={TextField}
            />
        

        <Typography>Password:</Typography>
            <Field 
            type="password" 
            name="password"
            component={TextField} 
            />
            <Box marginTop={5}
            display="flex" 
            alignItems="center"
            justifyContent="center">
            <Button type="submit" color='primary' variant='contained'> Signup!</Button>
            </Box>
            
            </Form>
          
            )}
            </Formik>
            </Box>
        </>
    )
}

export default SignupForm