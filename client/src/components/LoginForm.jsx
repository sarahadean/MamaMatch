import React, { useState, useContext } from 'react';
import * as yup from "yup";

import UserContext from './Pages/UserContext';
import { Formik, Field, ErrorMessage } from "formik";

function LoginForm({navigate}) {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const schema = yup.object().shape({
    username: yup.string().required("*Username is required"),
    password: yup.string().required("*Password is required")
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
          <label>
            Username:
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="h3" />
          </label>

          <label>
            Password:
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="h3" />
          </label>

          <input type="submit" value="Get Matchin'!" />
        </form>
        )}
      </Formik>
    </section>
  );
}

export default LoginForm;
