import React from "react";
import UserContext from "../contexts/UserContext";

export default function Login() {
  // State variables to hold the input values for username and password
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  // Access the setUser function from UserContext to update user information
  const { setUser } = React.useContext(UserContext);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    console.log("Username:", username)
    console.log("Password:", password)
    setUser({ username, password }); // Update the user context with new username and password
  }

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}
