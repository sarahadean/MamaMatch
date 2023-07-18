import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import UserContext from './UserContext';
import { TextField, Typography, FormControl, Box, Button, ListItem, List, ListItemText, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";

function SignupForm({updateUser}) {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const toggleSignup = () => setSignup((prev) => !prev);

  const schema = yup.object().shape({
    name: yup.string(),
    username: yup.string(),
    email: yup.string(),
    // phone_number: yup.string().required("*Phone number is required"),
    password: yup.string(),
    // dob: yup.string().required("*Date of birth is required"),
    // location: yup.string().required("*Location is required"),
    // profile_image: yup.string(),
    // about: yup.string()
    // mom_life: yup.string(),
    // interests: yup.string()
  })

  const formik = useFormik({

      initialValues: {
          name: "",
          username: "",
          email: "",
          password: "",
      },

      validationSchema: schema,
  
        onSubmit: (values, actions) => {
            fetch("/api/signup", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(values)
            }).then (res => {
                if(res.ok){
                    res.json().then(user => {
                      console.log(user)
                      setUser(user)
                      navigate("/profile")
                      actions.resetForm()
                    });

                } else{
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
          }
        })



  return (
    <section>
            {/* {signup ? ( */}

            <form onSubmit={formik.handleSubmit}>
            <FormControl>

            


            <label> Name:
            <input 
            type="text" 
            name="name" 
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? (
            <h3>{formik.errors.name}</h3>
            ) : ("")}
            </label>

            <input
            type="text"
            name="username" 
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}/> Username:
            {formik.touched.username && formik.errors.username ? (
            <h3>{formik.errors.username}</h3>
            ) : ("")}
           

            <label> Email:
            <input 
            type="text"
            name="email" 
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (
            <h3>{formik.errors.email}</h3>
            ) : ("")}
            </label>

            <label> Password:
            <input 
            type="password" 
            name="password" 
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? (
            <h3>{formik.errors.password}</h3>
            ) : ("")}
            </label>
            <input type="submit" value="Signup!" />
            </FormControl>
            </form>
        
        </section>
    )
}

export default SignupForm