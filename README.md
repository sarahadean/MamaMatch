# MamaMatch - Find your Village

## User Stories:
- Find potential mom-friends in your area
- Interact with user profiles to find out if you are a mom-match!
- Message new friends

## Features
- Upon opening app, user will be greeted with welcome screen where they can either Signup or Login.
- User can customize profile with their own interests and update their profile later
- User can search through profiles of other users and select either 'thumbs up' or 'thumbs down'
- User can view list of potential friends who have positively interacted with user's profile but have not 'matched'
- User can view list of 'matches' (friend's list) as well as delete friend. 
- User can send messages to friends. 


## Wireframe:
https://www.figma.com/file/MbtQ6o1dWaNJ3pyvm4vRBV/MomFriendFinder?type=whiteboard&node-id=0%3A1&t=4OYjARU12DIrnJ0k-1

![image](https://github.com/sarahadean/capstone/assets/128323898/860909a4-9b53-4e62-8b57-69208bb0649e)
![image](https://github.com/sarahadean/capstone/assets/128323898/cbe668a0-eef4-4e32-8193-897146abdf97)
![image](https://github.com/sarahadean/capstone/assets/128323898/0c377b6c-a502-4f3a-9cd2-11fd53fa580e)
![image](https://github.com/sarahadean/capstone/assets/128323898/c2426630-181f-432a-85ca-cbc02ecd0194)
![image](https://github.com/sarahadean/capstone/assets/128323898/19d23af3-9946-4156-8deb-661c6b5fc335)
![image](https://github.com/sarahadean/capstone/assets/128323898/a4e7a231-d989-43b2-85f4-cac2aa11e35c)







![Screenshot 2023-07-03 at 7 18 26 PM](https://github.com/sarahadean/capstone/assets/128323898/d95fa2f5-71c9-4b17-a8a1-c00796647de9)

## Schema:
https://dbdiagram.io/d/64a2f12702bd1c4a5e6ce584

![Screenshot 2023-07-03 at 8 31 24 PM](https://github.com/sarahadean/capstone/assets/128323898/a913cbcc-7922-4d49-8995-290d60d6f529)


## API Routes:

| Route              | Method | Body         | Response                 | Explanation                                        |
|--------------------|--------|--------------|--------------------------|----------------------------------------------------|
| /signup            | POST   | form or json |  [{user schema}], 200    | Creates a new user when  they signup.              |
| /login             | POST   | form or json | {User schema}, 200       | Logs user into app.                                |
| /users             | GET    | none         | [{User schema}], 200     | Displays all users                                 |
| /users/id          | PATCH  | form or json | {User schema},200        | Allows user to update/change their  information    |
|                    | DELETE | none         | {}, 204                  | Allows user to delete their profile                |
| /friendship_status | GET    | none         |                          | Displays friends with 'matched' status             |
|                    | PATCH  | form or json |                          | Changes friends status from 'pending' to 'matched' |
|                    | DELETE | none         |                          | Deletes friend                                     |
| /friendship        | POST   | form or json |                          |                                                    |
| /messages/id       | GET    | none         | [{Messages schema}], 200 | Retrieves all of user's messages                   |
|                    | DELETE | none         | {}, 204                  |                                                    |
| /messages/user     | GET    | none         | [{Messages schema}], 200 | Retrieves messages for specific recipient user     |
| /messages          | POST   | form or json | {Messages schema}, 200   | New message is created                             |

## Component Tree:

![Screenshot 2023-07-04 at 9 30 09 PM](https://github.com/sarahadean/capstone/assets/128323898/b1ca9aef-b354-403a-bdee-a18c1034d419)

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
