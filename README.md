# MamaMatch
Find your Village

## User Stories:


## Wireframe:
https://www.figma.com/file/MbtQ6o1dWaNJ3pyvm4vRBV/MomFriendFinder?type=whiteboard&node-id=0%3A1&t=4OYjARU12DIrnJ0k-1
![Screenshot 2023-07-03 at 7 18 26 PM](https://github.com/sarahadean/capstone/assets/128323898/d95fa2f5-71c9-4b17-a8a1-c00796647de9)

## Schema:
https://dbdiagram.io/d/64a2f12702bd1c4a5e6ce584

![Screenshot 2023-07-03 at 8 31 24 PM](https://github.com/sarahadean/capstone/assets/128323898/a913cbcc-7922-4d49-8995-290d60d6f529)


## API Routes:
| Route              | Method | Body                                                                                                                                                               | Response                                                                                                                                                                            | Explanation                                        |
|--------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| /signup            | POST   | { "name":" ",  "username": " ", "password": "***", "email": " ", "phone": " ", "dob": " ", "gender": " ", "profile_image": " ", "about":" ", "interested_in":" " } | { "name":" ",  "username": " ", "password": "***", "email": " ", "phone": " ", "dob": " ", "gender": " ", "profile_image": " ", "about":" ", "interested_in":" " }, {..}, {..}, ... | Creates a new user when  they signup.              |
| /login             | POST   | { "username":"", "password":"***" }                                                                                                                                | User info {...}                                                                                                                                                                     | Logs user into app.                                |
| /users             | GET    |                                                                                                                                                                    | { "name":" ",  "username": " ", "password": "***", "email": " ", "phone": " ", "dob": " ", "gender": " ", "profile_image": " ", "about":" ", "interested_in":" " }, {..}, {..}, ... | Displays all users                                 |
| /users/id          | PATCH  | { "attribute":"new value" }                                                                                                                                        | { "name":" ",  "username": " ", "password": "***", "email": " ", "phone": " ", "dob": " ", "gender": " ", "profile_image": " ", "about":" ", "interested_in":" " }                  | Allows user to update/change their  information    |
|                    | DELETE |                                                                                                                                                                    | {}                                                                                                                                                                                  | Allows user to delete their profile                |
| /friendship_status | GET    |                                                                                                                                                                    | {                                                                                                                                                                                   | Displays friends with 'matched' status             |
|                    | PATCH  |                                                                                                                                                                    |                                                                                                                                                                                     | Changes friends status from 'pending' to 'matched' |
|                    | DELETE |                                                                                                                                                                    |                                                                                                                                                                                     | Deletes friend                                     |
| /friendship        | POST   | { "username":" ", "username":" : }                                                                                                                                 |                                                                                                                                                                                     |                                                    |
| /messages/id       | GET    |                                                                                                                                                                    | [ {..}, {..}, .. ]                                                                                                                                                                  | Retrieves all of user's messages                   |
|                    | DELETE |                                                                                                                                                                    | {}                                                                                                                                                                                  |                                                    |
| /messages/user     | GET    |                                                                                                                                                                    | [ {..}, {..}, .. ]                                                                                                                                                                  | Retrieves messages for specific recipient user     |
| /messages          | POST   | { "username":" ", "content":" " }                                                                                                                                  |                                                                                                                                                                                     | New message is created                             |


## Component Tree:

## Client-side Routes:

| Route          | Component       | Description                                                                                                             |
|----------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| /welcome       | WelcomePage.js  | Welcome page for users to signup or login                                                                               |
| /signup        | SignupForm.js   | Contains form to signup and gain access to app                                                                          |
| /login         | LoginForm.js    | Login page                                                                                                              |
| /home          | Home.js         | Shows list of potential friend matches for user to view, filter                                                         |
| /interested    | PendingList.js  | Shows list of users who are interested in being user's friend (User has not matched with them yet) - filtered by status |
| /friends       | FriendsList.js  | Shows list of user's friends they have been matched with - filtered by status                                           |
| /messages      | MessagesList.js | Shows list of all conversations user has with other users/friends                                                       |
| /messages/user | Conversation.js | Shows conversation between user and another user                                                                        |
