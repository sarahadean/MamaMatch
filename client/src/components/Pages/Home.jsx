import React, { useEffect, useState, useContext} from 'react'
import UserContext from './UserContext'
import UserCard from '../UserCard';


function Home() {
  const { user, setUser } = useContext(UserContext);
  const [friends, setFriends] = useState([])

  // change state of filtered friends
  function updateFriend(newfriend){
    setFriends((friends.filter((friend) => friend.id !== newfriend.receiving_user_id)))
  }
  

  useEffect(() => {
  fetchUsers()}, [user])
  

  //fetching users who are not in friendship with current user
  function fetchUsers(){
    if (user){
      fetch(`/api/filtered_users/${user.id}`)
        .then(res => {
          console.log(res)
          if (res.ok) {
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
    console.log(friends)

  if (!user) {
    return <div>Loading...</div>;
  }

  //Creating cards for all user
  //pass down friendship state and do conditional logic to determine buttons
  // const filteredUsers = friends.map((friend) => { 
  // return <UserCard 
  // friendship={friendship} 
  // updateFriendship={updateFriendship} 
  // key={friend.id} 
  // friend={friend}
  //  />})
  
  return (
    <div className='container'>
      {friends.map(friend => {
        return <UserCard 
        key={friend.id} 
        friend={friend} 
        friends={friends} 
        updateFriend={updateFriend}
        />;
      })}
        
    </div>
  )
}

export default Home