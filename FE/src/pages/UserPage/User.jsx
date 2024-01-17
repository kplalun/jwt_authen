import React, { useEffect } from "react";
import { fetch } from "../../utilities/fetch";

const User = () => {
  const LoadData = async () => {
    const result = await fetch.get("/user",);
    console.log(result);
  };
  useEffect(() => {
    console.log("hi user")
    LoadData();
  }, []);
  return <div>User</div>;
};

export default User;
