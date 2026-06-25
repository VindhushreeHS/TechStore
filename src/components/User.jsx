import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const User = () => {
  const userName = useContext(UserContext);
  return (
    <div>
      <h3>Hello {userName}</h3>
    </div>
  );
};

export default User;
