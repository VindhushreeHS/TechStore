import React from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const user = "Vindhu";
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
