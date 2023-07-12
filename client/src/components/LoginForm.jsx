import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"

function LoginForm() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup.string(),
    password: yup.string()
  })

  const formik = useFormik({

    initialValues: {
        username: "",
        password: "",
    },

    validationSchema: schema,

    onSubmit: (values, actions) => {
      fetch('/api/login', {
        method: "POST",
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(res => {
        if(res.ok){
          res.json().then(user => {
            actions.resetForm()
            updateUser(user)
            navigate("/home")
          })
        } else {
          res.json().then(error => setError(error.message));
        }
      })

    }
  })
  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
      <label> Username:
            <input 
            type="text"
            name="username" 
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}/>
            {formik.touched.username && formik.errors.username ? (
            <h3>{formik.errors.username}</h3>
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
            <input type="submit" value="Get Matchin'!" />    
      </form>
    </section>
  )
}

export default LoginForm