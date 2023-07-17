import React, { useEffect, useState, useContext} from 'react'
import { Formik, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import UserContext from './Pages/UserContext';
import Message from './Message';


//fetch all of the messages for a single conversation
//map through fetch for message component
function Conversation() {
  const { user, setUser } = useContext(UserContext);
  const {id} = useParams()
  // const {receiving_user_name, requesting_user_name, receiving_user_id, requesting_user_id } = convo

  const [messages, setMessages] = useState([])
//successfully getting correct information
console.log(id)

//if messages.length() < 0

// const friend_id = user.id === receiving_user_id ? friend_id === requesting_user_id : friend_id === receiving_user_id

  //state of all messages for single friendship
// const [friendshipMessages, setFriendshipMessages] = useState([])

useEffect(() => {
  fetch(`/api/messages/${user.id}/${id}`)
  .then(res => {
    console.log(res)
    if (res.ok) {
      return res.json()
    } else if (res.status == 404){
      return []
    } else {
      throw new Error("Error fetching address details")
    }
  })
  .then(messages => setMessages(messages))
}, [user])


  return (
    <>
    <div>
      {/* {user.name === receiving_user_name ? (
        <h3>{requesting_user_name}</h3>
      ) : (
        <h3>{receiving_user_name}</h3>
      )} */}
      {/* <p>{messages[0]}</p> */}

      {[...messages].map((message) => (
        <Message key={message.id} 
        message={message} />
      ))}
    </div>
    <Formik
          initialValues={{
            // friendship_id: friendship.id,
            // author: user.id,
            content: "",
          }}
          // validationSchema={validationSchema}
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
                console.log(res)
                if (res.ok) {
                  res.json().then((messages) => {
                    setMessages(messages)
                    actions.resetForm() 
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
                Send Message:
                <Field type="text" name="content" />
                <ErrorMessage name="content" component="h3" />
              </label>
              <input type="submit" value="Send" />
            </form>
          )}
        </Formik>
    </>
  )
}

export default Conversation