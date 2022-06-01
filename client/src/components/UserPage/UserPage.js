import React, { useEffect, useState } from "react";
import { GET_USER } from "./gql";
import { useQuery } from "@apollo/client";

function UserPage({ userId, callLogoutUser }) {
  const [user, setUser] = useState({});
  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  return (
    <div>
      <div>Settings</div>
      <div>Battler</div>
      <div>Owner</div>
      <h1>Logged in as {user?.email}</h1>
      <button style={{ color: "red" }} onClick={callLogoutUser}>
        Log out
      </button>
    </div>
  );
}

export default UserPage;
