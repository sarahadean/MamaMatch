import { useContext } from 'react'
import UserContext from './Pages/UserContext';


//need new status = Not interested??
//pressing X will create friendship with status "hide", 
//clicking yes will create friendship with status "pending"
//add conditional to hide buttons
function UserCard({ friend, updateFriendship, friendship}) {
  const {id, name, profile_image, location, about, mom_life, interests} = friend
  const { user, setUser } = useContext(UserContext);
  // console.log(friend)
  // console.log(friendship)

  function handleSubmit(e, value){
    console.log(value)
    fetch('/api/user_friendships', {
      method: "POST",
      headers: {
      "content-type": "application/json"
      },
      body: JSON.stringify({
        requesting_user_id: user.id,
        receiving_user_id: id,
        status: value
      })
      })
      .then(res => {
      if (res.ok) {
      res.json().then(data => {
        updateFriendship(data.friendship)
        // updateFriend(data.friend)
        // updateFriend(data.friends)

      })
      } else {
      res.json().then(error => setError(error.message));
      }
      })
      }

  return (
    <div className='card'>

    
      {friendship ? (
        ""
        ) : (
      <div>
        
          <img src={profile_image}></img>
          <h3>{name}</h3>
          <ul>
          {/* <li>{mom_life}</li> */}
          <li>{location}</li>
          <li>{about}</li>
          {/* <li>{interests}</li> */}
        </ul>
        <button onClick={(e) => handleSubmit(e, "PENDING")}>Yes</button>
        <button onClick={(e) => handleSubmit(e, "HIDDEN")}>No</button>
      </div>
      )}
      

    </div>
  )
}

export default UserCard