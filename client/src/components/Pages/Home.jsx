import React, { useEffect, useState, useContext} from 'react'
import UserContext from './UserContext'
import UserCard from '../UserCard';
import { Formik, Field, ErrorMessage } from "formik";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [potentialFriends, setPotentialFriends] = useState([])

  function updatePotentialFriend(){
    setPotentialFriends(potentialFriends)
  }

  useEffect(() => {
  fetchUsers() }, [user])
  

  //fetching users who are not in friendship with current user
  function fetchUsers(){
    if (user){
      fetch(`/api/filtered_users/${user.id}`)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else if (res.status == 404) {
            return []
          } else {
            throw new Error("Error fetching address details");
          }
        })
        .then(potentialFriends => setPotentialFriends(potentialFriends))
    
    }
    }

  if (!user) {
    return <div>Loading...</div>;
  }

  const filteredUsers = potentialFriends.map((friend) => { 
  return <UserCard updatePotentialFriend={updatePotentialFriend} key={friend.id} friend={friend}/>})
  return (
    <div>Home-this will display the filtered user's route
      {filteredUsers}
    </div>
  )
}

export default Home