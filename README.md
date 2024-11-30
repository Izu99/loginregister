# Login-Register App

This is a simple login-register app using React for the frontend and Express with MongoDB for the backend. The app allows users to register, login, and view a homepage after authentication.

## Features

- **User Registration**: Users can register with their name, email, and password. The password is encrypted using bcrypt before storing it in the MongoDB database.
- **Login**: Registered users can log in using their email and password.
- **Password Validation**: The password is validated during login, and bcrypt is used to decode the password.
- **Email Validation**: The email entered during registration and login is validated.
- **Homepage Access**: Only logged-in users can access the homepage, where their username is displayed.
- **Context for User Data**: The app uses a `contextUser` file to store user login data, which is then used in the homepage to display the username of the logged-in user.
- **Linking Between Pages**: There are links on the login page to redirect to the registration page and vice versa.

## Features Breakdown

- **Password Encryption**: Passwords are encrypted using bcrypt before being stored in the database.
- **Login and Registration Flow**:
  - Login page allows users to input their email and password.
  - Registration page allows users to input their name, email, and password.
  - Password is decoded during login using bcrypt.
  - On successful login, users are redirected to the homepage.
- **Homepage**:
  - Displays the username of the logged-in user.
  - If the user is not logged in, they will be prompted to log in.
- **Context**: The app uses a context file to save the logged-in user data, which can be accessed in different components.
  
## Setup Instructions

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Izu99/loginregister.git
