import { Formik, Field, ErrorMessage, Form } from "formik";
import { useState, useContext } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { TextField } from "formik-mui";
import {Typography, FormControl, Box, Button, ListItem, List, ListItemText, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";
import { Image } from "@material-ui/icons";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(true);

  const navigate = useNavigate();

  const toggleEdit = () => setEdit((prev) => !prev);

  function handleDelete(){
    fetch(`/api/current_user/${user.id}`, {
    method: "DELETE",
    headers:{
    "content-type": "application/json"
    },
    }).then(res => {
    if (res.ok) {
    setUser(null)
    navigate('/')
    } else {
    res.json().then(error => setError(error.message));
    }
    })
    }

  if (!user) {
    return <div>Loading...</div>;
  }

  // const validationSchema = yup.object().shape({
  //   name: yup.string(),
  //   username: yup.string(),
  //   email: yup.string(),
  //   password: yup.string(),
  //   phone_number: yup.string(),
  //   dob: yup.string(),
  //   location: yup.string(),
  //   profile_image: yup.string(),
  //   about: yup.string(),
  //   mom_life: yup.string(),
  //   interests: yup.string(),
  // });

  return (
    <>
    {edit ? 
    (
    <Box>
        <List>
          <ListItem>
            <Typography variant="h6">My login info</Typography>
          </ListItem>
          <ListItem> 
            <ListItemText>Username: {user.username} </ListItemText>
            </ListItem>
          <ListItem> Email: {user.email}</ListItem>
          <Divider/>

          <ListItem>
            <Typography variant="h6">My profile picture</Typography>
          </ListItem>
          <ListItem>
            <img src={user.profile_image} width={300}></img>
          </ListItem>
          
          <Divider/>

          <ListItem>
            <Typography variant="h6">My Bio</Typography>
          </ListItem>
          <ListItem>{user.about}</ListItem>
          <Divider/>

          <ListItem>
            <Typography variant="h6">More about me</Typography>
          </ListItem>
          <ListItem>Display Name: {user.name} </ListItem>
          <ListItem>Birthday: {user.dob}</ListItem>
          <ListItem>Location: {user.location}</ListItem>
          <ListItem>Phone Number: {user.phone_number}</ListItem>

          <ListItem >
            <Typography variant="h6">My life</Typography>
          </ListItem>
          <ListItem>{user.mom_life}</ListItem>
          <Divider/>

          <ListItem>
            <Typography variant="h6">My Interests</Typography>
          </ListItem>
          <ListItem>{user.interests}</ListItem>
        </List>
        <Button onClick={toggleEdit}>Edit</Button>
        <Button onClick={() => handleDelete()}>Delete Profile</Button>
      </Box>
    ) : 
    (
    <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '50ch' },
    }}>
      <Formik
          initialValues={{
            name: user.name,
            username: user.username,
            email: user.email,
            password: "",
            phone_number: user.phone_number,
            dob: user.dob,
            location: user.location,
            profile_image: user.profile_image,
            about: user.about,
            mom_life: user.mom_life,
            interests: user.interests,
          }}
          // validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            fetch(`/api/current_user/${user.id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password,
                phone_number: values.phone_number,
                dob: values.dob,
                location: values.location,
                profile_image: values.profile_image,
                about: values.about,
                mom_life: values.mom_life,
                interests: values.interests
              }),
            })
              .then((res) => {
                console.log(res)
                if (res.ok) {
                  res.json().then((user) => {
                    console.log(user)
                    setUser(user);
                    toggleEdit();
                    // navigate("/profile");
                  });
                } else {
                  res.json().then((data) => {
                    if (data && data.message) {
                      setError(data.message);
                    } else {
                      setError("An error occurred during signup.");
                    }
                  });
                }
              })
              .catch((error) => {
                setError("An error occurred during signup.");
                console.error(error);
              });
          }}
        >
          {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <Box marginBottom={2}>
                <Typography>Name:</Typography>
                <Field type="text" name="name" component={TextField}/>
                <ErrorMessage name="name" component="h3" />
              </Box>
              <Box marginBottom={2}>
                <Typography>Username:</Typography>
                <Field type="text" name="username" component={TextField}/>
                <ErrorMessage name="username" component="h3" />
              </Box>
              <Box marginBottom={2}>
                <Typography>Email:</Typography>
                <Field type="text" name="email" component={TextField} />
                <ErrorMessage name="email" component="h3" />
              </Box>
              <Box marginBottom={2}>
                <Typography>Password:</Typography>
                <Field type="password" name="password" component={TextField}/>
                <ErrorMessage name="password" component="h3" />
              </Box>

              <Box marginBottom={2}>
              <Typography>Phone Number:</Typography>
                <Field type="text" name="phone_number" component={TextField} />
                <ErrorMessage name="phone_number" component="h3" />
                </Box>

                <Box marginBottom={2}>
                <Typography>Birthday:</Typography>
                <Field type="text" name="dob" component={TextField}/>
                <ErrorMessage name="dob" component="h3" />
</Box>

                <Box marginBottom={2}>
                <Typography>Location:</Typography>
                <Field type="text" name="location" component={TextField}/>
                <ErrorMessage name="location" component="h3" />
                </Box>
              <Divider />
              <Box marginBottom={2}>
                <Typography variant="h6">Change my profile picture</Typography>
                {/* <img src={user.profile_image} width={300} alt="Profile" /> */}
                <Field type="text" name="profile_image"size="small" component={TextField}/>
                <ErrorMessage name="profile_image" component="h3" />
              </Box>
      
              <Box marginBottom={2}>
                <Typography>Say a little about yourself, mama</Typography>
                <Field type="text" name="about" component={TextField}/>
                <ErrorMessage name="about" component="h3" />
              </Box>
              <Divider />
              <Box marginBottom={2}>
                
                
                
              </Box>
              <Divider />
      
          
            <Typography variant="h6">My life</Typography>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
              {/* <Button value={1} control={<Radio />} label="Pregnant" >Pregnant</Button>
              <Button value={2} control={<Radio />} label="New Mom" >New Mom</Button>
              <Button value="3" control={<Radio />} label="Toddler Mom" >Toddler Mom</Button>
              <Button value="4" control={<Radio />} label="Have Teenagers" >Have Teens</Button>
              <Button value="5" control={<Radio />} label="Empty Nester" >Empty Nester</Button> */}
              {/* <FormControlLabel value="2" control={<Radio />} label="New Mom" />
              <FormControlLabel value="3" control={<Radio />} label="Toddler Mom" />
              <FormControlLabel value="4" control={<Radio />} label="Have Teenagers" />
              <FormControlLabel value="5" control={<Radio />} label="Planning for a family" /> */}
    
              {/* <FormControlLabel value="6" control={<Radio />} label="Empty Nester" />
              <FormControlLabel value="7" control={<Radio />} label="Adoption Journey" />
              <FormControlLabel value="8" control={<Radio />} label="Fertility Journey" />
              <FormControlLabel value="9" control={<Radio />} label="Have School-age children" />
              <FormControlLabel value="10" control={<Radio />} label="Have Preteens" /> */}
            </RadioGroup>
            <Divider/>
            <Typography variant="h6">My Interests</Typography>
       
            {/* <label>
              Mom life:
              <Field as="select" name="mom_life">
                <option value="">Select one</option>
                <option value="1">Pregnant</option>
                <option value="2">New Mom</option>
                <option value="3">Have Toddlers</option>
                <option value="4">Have Teenagers</option>
                <option value="5">Planning for a family</option>
                <option value="6">Empty Nester</option>
                <option value="7">Adoption Journey</option>
                <option value="8">Fertility Journey</option>
              </Field>
              <ErrorMessage name="mom_life" component="h3" />
            </label> */}

            {/* <label>
              Interests:
              <Field type="text" name="interests" />
              <ErrorMessage name="interests" component="h3" />
            </label> */}
            <Button type="submit" color="primary">Update</Button>
            </FormControl>
          </Form>
          )}
        </Formik>
        <Button onClick={toggleEdit}>Discard changes</Button>
      </Box>
    )}
      
    </>
    // <section>
    //   {edit  ? (
    //     <div>
    //       <ul>
    //         <li>Name: {user.name}</li>
    //         <li>Username: {user.username}</li>
    //         <li>Email: {user.email}</li>
    //         {/* <li>password: {user.password}</li> */}
    //         <li>Phone Number: {user.phone_number}</li>
    //         <li>Birthday: {user.dob}</li>
    //         <li>City, State: {user.location}</li>
    //         <li>Profile picture: </li>
    //         <img src={user.profile_image}/>
    //         <li>About: {user.about}</li>
    //         <li>Mom Life: {user.mom_life}</li>
    //         <li>Interests: {user.interests}</li>
    //       </ul>
    //       <button onClick={toggleEdit}>Edit</button>
    //     </div>
    //   ) : (
    //     <Formik
    //       initialValues={{
    //         name: user.name,
    //         username: user.username,
    //         email: user.email,
    //         password: "",
    //         phone_number: user.phone_number,
    //         dob: user.dob,
    //         location: user.location,
    //         profile_image: user.profile_image,
    //         about: user.about,
    //         mom_life: user.mom_life,
    //         interests: user.interests,
    //       }}
    //       // validationSchema={validationSchema}
    //       onSubmit={(values, actions) => {
    //         console.log(values)
    //         fetch(`/api/current_user/${user.id}`, {
    //           method: "PATCH",
    //           headers: {
    //             "content-type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             name: values.name,
    //             username: values.username,
    //             email: values.email,
    //             password: values.password,
    //             phone_number: values.phone_number,
    //             dob: values.dob,
    //             location: values.location,
    //             profile_image: values.profile_image,
    //             about: values.about,
    //             mom_life: values.mom_life,
    //             interests: values.interests}),
    //         })
    //           .then((res) => {
    //             console.log(res)
    //             if (res.ok) {
    //               res.json().then((user) => {
    //                 console.log(user)
    //                 setUser(user);
    //                 toggleEdit();
    //                 // navigate("/profile");
    //               });
    //             } else {
    //               res.json().then((data) => {
    //                 if (data && data.message) {
    //                   setError(data.message);
    //                 } else {
    //                   setError("An error occurred during signup.");
    //                 }
    //               });
    //             }
    //           })
    //           .catch((error) => {
    //             setError("An error occurred during signup.");
    //             console.error(error);
    //           });
    //       }}
    //     >
    //       {({ handleSubmit }) => (
    //       <form onSubmit={handleSubmit}>
    //         <label>
    //           Name:
    //           <Field type="text" name="name" />
    //           <ErrorMessage name="name" component="h3" />
    //         </label>

    //         <label>
    //           Username:
    //           <Field type="text" name="username" />
    //           <ErrorMessage name="username" component="h3" />
    //         </label>

    //         <label>
    //           Email:
    //           <Field type="text" name="email" />
    //           <ErrorMessage name="email" component="h3" />
    //         </label>

    //         <label>
    //           Password:
    //           <Field type="password" name="password" />
    //           <ErrorMessage name="password" component="h3" />
    //         </label>

    //         <label>
    //           Phone Number:
    //           <Field type="text" name="phone_number" />
    //           <ErrorMessage name="phone_number" component="h3" />
    //         </label>

    //         <label>
    //           Date of Birth:
    //           <Field type="text" name="dob" />
    //           <ErrorMessage name="dob" component="h3" />
    //         </label>

    //         <label>
    //           Profile Picture:
    //           <Field type="text" name="profile_image" />
    //           <ErrorMessage name="profile_image" component="h3" />
    //         </label>

    //         <label>
    //           Location:
    //           <Field
    //             type="text"
    //             name="location"
    //             placeholder="City, State"
    //           />
    //           <ErrorMessage name="location" component="h3" />
    //         </label>

    //         <label>
    //           Tell us a little about yourself, mama:
    //           <Field type="text" name="about" />
    //           <ErrorMessage name="about" component="h3" />
    //         </label>

    //         <label>
    //           Mom life:
    //           <Field as="select" name="mom_life">
    //             <option value="">Select one</option>
    //             <option value="1">Pregnant</option>
    //             <option value="2">New Mom</option>
    //             <option value="3">Have Toddlers</option>
    //             <option value="4">Have Teenagers</option>
    //             <option value="5">Planning for a family</option>
    //             <option value="6">Empty Nester</option>
    //             <option value="7">Adoption Journey</option>
    //             <option value="8">Fertility Journey</option>
    //           </Field>
    //           <ErrorMessage name="mom_life" component="h3" />
    //         </label>

    //         <label>
    //           Interests:
    //           <Field type="text" name="interests" />
    //           <ErrorMessage name="interests" component="h3" />
    //         </label>
    //         <input type="submit" value="Update" />
    //       </form>
    //       )}
    //     </Formik>
    //   )}
    // </section>
  );
}

export default Profile;
