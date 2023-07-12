import React, { useEffect, useState, useContext} from 'react'
import UserContext from './UserContext'
import UserCard from '../UserCard';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [friends, setFriends] = useState([])

  useEffect(() => {
  fetchUsers() }, [user])
  

  //fetching users who are not in friendship with current user
  function fetchUsers(){
    if (user){
      fetch(`/api/filtered_users/${user.id}`)
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          } else if (res.status == 404) {
            return []
          } else {
            throw new Error("Error fetching address details");
          }
        })
        .then(friends => setFriends(friends))
    
    }
    }

  

  if (!user) {
    return <div>Loading...</div>;
  }

  const filteredUsers = friends.map((friend) => { 
  return <UserCard key={friend.id} friend={friend}/>})
  return (
    <div>Home-this will display the filtered user's route
      {filteredUsers}
    </div>
  )
}

export default Home