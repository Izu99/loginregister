import React from 'react';
import { useUser } from '../context/userContext';  // Import the custom hook from the context file

const HomePage = () => {
  const { user } = useUser();  // Access user data from the context

  if (!user.token) {
    return <p>Please log in to access the homepage.</p>;
  }

  return (
    <div className="home-container">
      <h2>Welcome to the Home Page</h2>
      <p>You are logged in as {user.name}</p>  {/* Use the user data from context */}
    </div>
  );
};

export default HomePage;
