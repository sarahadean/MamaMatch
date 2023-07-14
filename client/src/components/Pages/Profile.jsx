import { Formik, Field, ErrorMessage } from "formik";
import { useState, useContext } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(true);
  const navigate = useNavigate();

  const toggleEdit = () => setEdit((prev) => !prev);

  if (!user) {
    return <div>Loading...</div>;
  }

  const validationSchema = yup.object().shape({
    name: yup.string(),
    username: yup.string(),
    email: yup.string(),
    password: yup.string(),
    phone_number: yup.string(),
    dob: yup.string(),
    location: yup.string(),
    profile_image: yup.string(),
    about: yup.string(),
    mom_life: yup.string(),
    interests: yup.string(),
  });

  return (
    <section>
      {edit  ? (
        <div>
          <ul>
            <li>Name: {user.name}</li>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            {/* <li>password: {user.password}</li> */}
            <li>Phone Number: {user.phone_number}</li>
            <li>Birthday: {user.dob}</li>
            <li>City, State: {user.location}</li>
            <li>Profile picture: </li>
            <img src={user.profile_image}/>
            <li>About: {user.about}</li>
            <li>Mom Life: {user.mom_life}</li>
            <li>Interests: {user.interests}</li>
          </ul>
          <button onClick={toggleEdit}>Edit</button>
        </div>
      ) : (
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
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            fetch(`/api/current_user/${user.id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.ok) {
                  res.json().then((user) => {
                    setUser(user);
                    {toggleEdit()};
                    navigate("/profile");
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

            <label>
              Phone Number:
              <Field type="text" name="phone_number" />
              <ErrorMessage name="phone_number" component="h3" />
            </label>

            <label>
              Date of Birth:
              <Field type="text" name="dob" />
              <ErrorMessage name="dob" component="h3" />
            </label>

            <label>
              Profile Picture:
              <Field type="text" name="profile_image" />
              <ErrorMessage name="profile_image" component="h3" />
            </label>

            <label>
              Location:
              <Field
                type="text"
                name="location"
                placeholder="City, State"
              />
              <ErrorMessage name="location" component="h3" />
            </label>

            <label>
              Tell us a little about yourself, mama:
              <Field type="text" name="about" />
              <ErrorMessage name="about" component="h3" />
            </label>

            <label>
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
            </label>

            <label>
              Interests:
              <Field type="text" name="interests" />
              <ErrorMessage name="interests" component="h3" />
            </label>
            <input type="submit" value="Update" />
          </form>
          )}
        </Formik>
      )}
    </section>
  );
}

export default Profile;
