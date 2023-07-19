
# MamaMatch

MamaMatch is an app for mothers at any stage to connect with other moms in their area. Being a mom is hard enough, finding a your village shouldn't be. 
Find your unicorn mom-friend!
- Find potential mom-friends in your area
- 'Favorite' or 'Dislike' other user profiles to create a potential friendship. Users will receive 'requests' from other Users who favorite their profile.
- Confirm or Decline friend requests 
- Once a friendship is confirmed, User can chat with their new mom friend!

## Features
- Customizable profile. When logged in - user's profile picture displays in top corner. 
- Returning Users will be directed to home page with Users they have not interacted with. 
- User can view list of potential friends who have positively interacted with user's profile. User can then 'confirm' friendship or decline
- User can view list of confirmed friends. 
- User can send and receive messages.
- Material UI styling
- Self-Referential many-to-many relationship

Tech Stack:

[![My Skills](https://skillicons.dev/icons?i=js,py,flask,react,vite,materialui)](https://skillicons.dev)

## Schema:
https://dbdiagram.io/d/64a2f12702bd1c4a5e6ce584

<image src="https://github.com/sarahadean/capstone/assets/128323898/9d4b89b7-bbd3-4e1b-a48e-db270e1f94c6" width="600">

## Wireframe:
https://www.figma.com/file/MbtQ6o1dWaNJ3pyvm4vRBV/MomFriendFinder?type=whiteboard&node-id=0%3A1&t=4OYjARU12DIrnJ0k-1


<image src="https://github.com/sarahadean/capstone/assets/128323898/cbe668a0-eef4-4e32-8193-897146abdf97" width="300"> 
<image src="https://github.com/sarahadean/capstone/assets/128323898/860909a4-9b53-4e62-8b57-69208bb0649e" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/0c377b6c-a502-4f3a-9cd2-11fd53fa580e" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/c2426630-181f-432a-85ca-cbc02ecd0194" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/a4e7a231-d989-43b2-85f4-cac2aa11e35c" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/dcd82c75-8efa-4d83-801a-acb741046a36" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/e539a532-553e-4d00-b9dd-e9f9f42f77bc" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/67556049-7096-42a0-a3e3-08ee536d3b8d" width="300">
<image src="https://github.com/sarahadean/capstone/assets/128323898/664b5f13-60e6-49a4-b8d9-4682c209d4f8" width="300">



## API Routes:

| Route                                | Method | Body         | Response                    | Explanation                                                                                              |
|--------------------------------------|--------|--------------|-----------------------------|----------------------------------------------------------------------------------------------------------|
| /signup                              | POST   | form or json | {User schema}, 201          | Creates a new user when  they signup.                                                                    |
| /login                               | POST   | form or json | {User schema}, 200          | Logs user into app.                                                                                      |
| /logout                              | GET    |              |                             | Logs user out                                                                                            |
| /authorize_session                   | GET    |              |                             | Keeps user logged in                                                                                     |
| /FilteredUsers/<int:id>              | GET    | none         | [{User schema}], 200        | Displays all potential friends.  Filters out users that are already in a friendship  with current user.  |
| /current_user/<int:id>               | GET    |              | {User schema}, 200          | Retrieve's current user's information                                                                    |
|                                      | PATCH  |              | {User schema}, 200          | Updates current user's information                                                                       |
|                                      | DELETE | none         | {}, 204                     | Deletes user's account                                                                                   |
| /user_friendships                   | POST   | form or json | {Friendship Schema}, 201    | User adds friend/creates friendship  Default status = PENDING until potential friend responds            |
| /user_friendships/<id>/<status>      | GET    | none         | [{User Schema},], 200       | Displays user info for friendships with status = 'matched' and 'pending'                                 |
| /user_friendships/<int:id>           | GET    | form or json | [{Friendship Schema},], 200 | Retrieves user's friendships with messages attached                                                      |
| /friendship/<int:id>/<int:friend_id> | PATCH  | form or json | {Friendship Schema}, 200    | Updates friendship status to CONFIRMED or HIDDEN                                                         |
|                                      | DELETE | form or json | {}, 204                     | Delete's friendship                                                                                      |
| /messages/<int:id>/<int:friend_id>      | GET    | form or json | [{Messages schema}], 200    | Get's all messages for one friendship                                                                    |
|                                      | POST   | form or json | {Messages schema}, 201      | Creates new message                                                                                      |
|                                      | DELETE | none         | {}, 204                     | Delete's message                                                                                         |

## Component Tree:

![Screenshot 2023-07-04 at 9 30 09 PM](https://github.com/sarahadean/capstone/assets/128323898/b1ca9aef-b354-403a-bdee-a18c1034d419)

## Client-side Routes:

| Route          | Component        | Description                                                                                                             |
|----------------|------------------|-------------------------------------------------------------------------------------------------------------------------|
| /              | WelcomePage.jsx  | Welcome page for users to signup or login                                                                               |
| /signup        | SignupForm.jsx   | Contains form to signup and gain access to app                                                                          |
| /login         | LoginForm.jsx    | Login page                                                                                                              |
| /home          | Home.jsx         | Shows list of potential friend matches for user to view, filter                                                         |
| /interested    | PendingList.jsx  | Shows list of users who are interested in being user's friend (User has not matched with them yet) - filtered by status |
| /friends       | FriendsList.jsx  | Shows list of user's friends they have been matched with - filtered by status                                           |
| /messages/user | Conversation.jsx | Shows conversation between user and another user                                                                        |
| /profile       | Profile.jsx      | Shows user's profile information.                                                                                       |

## Trello Board
![Screenshot 2023-07-04 at 10 26 47 PM](https://github.com/sarahadean/capstone/assets/128323898/fcb6b404-43e4-455c-ae48-5f11f3384993)

## Future Updates:
- Google login integration
- Location services
- Filterable and searchable tags

