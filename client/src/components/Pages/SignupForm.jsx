import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import UserContext from './UserContext';

function SignupForm({updateUser}) {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const toggleSignup = () => setSignup(prev => !prev);

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
          // phone_number: "",
          // dob: "",
          // location: "",
          // profile_image: "",
          // about: "",
          // mom_life: "",
          // interests: ""
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

            {/* <label> Phone Number:
            <input 
            type="text" 
            name="phone_number" 
            onChange={formik.handleChange}
            value={formik.values.phone_number}
            onBlur={formik.handleBlur}/>
            {formik.touched.phone_number && formik.errors.phone_number ? (
            <h3>{formik.errors.phone_number}</h3>
            ) : ("")}
            </label>

            <label> Date of Birth:
            <input 
            type="text" 
            name="dob" 
            onChange={formik.handleChange}
            value={formik.values.dob}
            onBlur={formik.handleBlur} />
            {formik.touched.dob && formik.errors.dob ? (
            <h3>{formik.errors.dob}</h3>
            ) : ("")}
            </label>

            <label>Profile Picture:
              <input
              type='text'
              name='profile_image'
              onChange={formik.handleChange}
              value={formik.values.profile_image}
              onBlur={formik.handleBlur}/>
              {formik.touched.profile_image && formik.errors.profile_image ? (
            <h3>{formik.errors.profile_image}</h3>
            ) : ("")}
            </label>

            <label>Location:
              <input
              type='text'
              name='location'
              placeholder='City, State'
              onChange={formik.handleChange}
              value={formik.values.location}
              onBlur={formik.handleBlur}/>
              {formik.touched.location && formik.errors.location ? (
            <h3>{formik.errors.location}</h3>
            ) : ("")}
            </label>

            <label>Tell us a little about yourself, mama:
              <input
              type='text'
              name='about'
              onChange={formik.handleChange}
              value={formik.values.about}
              onBlur={formik.handleBlur}/>
              {formik.touched.about && formik.errors.about ? (
            <h3>{formik.errors.about}</h3>
            ) : ("")}
            </label> */}

            {/* <label>Mom life:
              <input
              type='text'
              name='mom_life'
              onChange={formik.handleChange}
              value={formik.values.mom_life}
              onBlur={formik.handleBlur}/>
              {formik.touched.mom_life && formik.errors.mom_life ? (
            <h3>{formik.errors.mom_life}</h3>
            ) : ("")}
            </label>

            <label>Interests:
              <input
              type='text'
              name='interests'
              onChange={formik.handleChange}
              value={formik.values.interests}
              onBlur={formik.handleBlur}/>
              {formik.touched.interests && formik.errors.interests ? (
            <h3>{formik.errors.interests}</h3>
            ) : ("")}
            </label> */}

            <input type="submit" value="Signup!" />
            
            </form>
        {/* {/* //     ) : (
        //     <form onSubmit={formik.handleSubmit}>
        //         <label> Username:
        //         <input 
        //         type="text"
        //         name="username" 
        //         onChange={formik.handleChange}
        //         value={formik.values.username}
        //         onBlur={formik.handleBlur}/>
        //         {formik.touched.username && formik.errors.username ? (
        //         <h3>{formik.errors.username}</h3>
        //         ) : ("")}
        //         </label>
        //         <label> Password
        //         <input 
        //          type="password" 
        //          name="password" 
        //          onChange={formik.handleChange}
        //          value={formik.values.password}
        //          onBlur={formik.handleBlur}/>
        //         {formik.touched.password && formik.errors.password ? (
        //          <h3>{formik.errors.password}</h3>
        //          ) : ("")}
        //         </label>
        //         <input type="submit" value="Log In" className="button" />
				// {error ? <label style={{ color: "red" }}>{error}</label> : ""}
        //     </form>
        //     )}
        //     <section>
        //       <p>{signup ? "Already have an account?" : "Not a member?"}</p>
        //       <button className="button" onClick={toggleSignup}>
        //         {signup ? "Login" : "Sign Up"}
        //       </button>
			  //     </section> */}
        </section>
    )
}

export default SignupForm