import React, { useState, useContext } from 'react';
import UserContext from './Pages/UserContext';
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";


function FriendsCard({friend, friendship, updateFriendship}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  const { user, setUser } = useContext(UserContext);
  const [toggleBox, setToggleBox] = useState(false)
  const [messages, setMessages] = useState([])
  console.log(friend)
  console.log(friendship)

//<----------DELETES FRIEND---------------->
function handleDelete(){
  fetch(`/api/friendship/${user.id}/${id}`, {
    method: "DELETE",
    headers: {
    "content-type": "application/json"
    },
    })
    .then(res => {
    if (res.ok) {
    res.json().then(friendship => {
      updateFriendship(friendship)
    })
    } else {
    res.json().then(error => setError(error.message));
    }
    })
    }

//<-------SENDS MESSAGE--------------->
const updateToggleBox = () => setToggleBox(prev => !prev);

const validationSchema = yup.object().shape({
  // friendship_id: yup.string(),
  // author: yup.string(),
  content: yup.string()
});

return (
  <>
    <div className='card'>
      <img src={profile_image}></img>
      <ul>
        <h3>{name}</h3>
        {/* <li>{pendingFriend.mom_life}</li> */}
        <li>{location}</li>
        <li>{about}</li>
        {/* <li>{pendingFriend.interests}</li> */}
      </ul>
      {/* clicking toggles hidden input box*/}
      <button onClick={updateToggleBox} className='button'> Message</button>
      <button onClick={() => handleDelete()} className='button'>Delete</button>
      {toggleBox ? (
        <Formik
          initialValues={{
            // friendship_id: friendship.id,
            // author: user.id,
            content: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            fetch(`/api/messages/${user.id}/${id}`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(values)
            })
              .then((res) => {
                if (res.ok) {
                  res.json().then((messages) => {
                    setMessages(messages)
                    updateToggleBox;
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
                Message:
                <Field type="text" name="content" />
                <ErrorMessage name="content" component="h3" />
              </label>
              <input type="submit" value="Send" />
            </form>
          )}
        </Formik>
        
      ) : (
        ""
      )}
      {/* <button> Block </button> */}
    </div>
  </>
);
}

export default FriendsCard;