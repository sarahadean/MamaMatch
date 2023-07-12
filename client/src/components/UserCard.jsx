import { useContext } from 'react'
import UserContext from './Pages/UserContext';


//need new status = Not interested??
//pressing X will create friendship with status "hide", 
//clicking yes will create friendship with status "pending"
//add conditional to hide buttons
function UserCard({ friend, updatePotentialFriend }) {
  const { user, setUser } = useContext(UserContext);
  const {id, name, profile_image, location, about, mom_life, interests} = friend

  function handleClick(value){
    handleSubmit(value)
  }

  function handleSubmit(){
    fetch('/api/user_friendships', {
      method: "POST",
      headers: {
      "content-type": "application/json"
      },
      body: JSON.stringify({
        requesting_user_id: user.id,
        receiving_user_id: id,
        status: `${value}`
      })
      })
      .then(res => {
      if (res.ok) {
      res.json().then(friend => {
        updatePotentialFriend(friend)
      })
      } else {
      res.json().then(error => setError(error.message));
      }
      })
      }

  return (
    <div>UserCard
        <ul>
          <img src={profile_image}></img>
          <li>{name}</li>
          <li>{mom_life}</li>
          <li>{location}</li>
          <li>{about}</li>
          <li>{interests}</li>
          <button onClick={() => handleClick} value="Pending">Yes</button>
          <button onClick={() => handleClick} value="Hidden">No</button>
        </ul>
    </div>
  )
}

export default UserCard