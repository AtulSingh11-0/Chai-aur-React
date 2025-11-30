import React from "react";
import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [user, setUser] = React.useState({
    username: "John Doe",
    password: "password123"
  });

  return (
    <UserContext.Provider value={{ user, setUser }} >
      {children}
    </UserContext.Provider>
  );
};