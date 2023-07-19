import React, { useState, useContext } from 'react';
import { useFormik, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import UserContext from './UserContext';

function SignupForm({updateUser}) {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const toggleSignup = () => setSignup((prev) => !prev);

  // const schema = yup.object().shape({
  //   name: yup.string(),
  //   username: yup.string(),
  //   email: yup.string(),
  //   // phone_number: yup.string().required("*Phone number is required"),
  //   password: yup.string(),
  //   // dob: yup.string().required("*Date of birth is required"),
  //   // location: yup.string().required("*Location is required"),
  //   // profile_image: yup.string(),
  //   // about: yup.string()
  //   // mom_life: yup.string(),
  //   // interests: yup.string()
  // })

  const handleSubmit = (values, actions) => {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log(user);
          setUser(user);
          navigate("/profile");
          actions.resetForm();
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
  };

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: ""
        }}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="h3" />
            </label>

            <label>
              Username:
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="h3" />
            </label>

            <label>
              Email:
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="h3" />
            </label>

            <label>
              Password:
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="h3" />
            </label>

            <input type="submit" value="Signup!" />
          </form>
        )}
      </Formik>
    </section>
  );
}


export default SignupForm