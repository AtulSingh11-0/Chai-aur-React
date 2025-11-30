import React from 'react'
import UserContext from '../contexts/UserContext'

export default function Profile() {
  // Access the user object from UserContext
  const { user } = React.useContext(UserContext);

  // If no user is logged in, prompt to login
  if (!user) {
    return <div>Login to view profile</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
    </div>
  )
}
