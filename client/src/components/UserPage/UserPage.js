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
      <div>
        MY VIEW as a USER who battles -- not others view of my battler page:
      </div>
      <div>G: Username</div>
      <div>G: Profile Photo -- verified</div>
      <div>G: Top Battles of the week</div>
      <div>G: Active Twitter Spaces??</div>
      <div>G: Settings</div>
      <div>G: FB/Insta/Twitter for modification</div>
      <div>B: Rank</div>
      <div>B: Total Views/Avg Views</div>
      <div>B: Homeleague name/logo</div>
      <div>
        B: League chat -- possibly on this page directly for ease of access
      </div>
      <div>B: Crew chat?? Tbd</div>
      <div>
        B: Requests/Messages/Alerts idk for Crew/League/Booking requests
      </div>
      <div>B: Calendar for upcoming events?</div>

      <div>Settings should:</div>
      <div>Modify booking price -- public or not</div>
      <div>Request a home league/Remove home league</div>
      <div>Modify user image/battle image</div>
      <button style={{ color: "red" }} onClick={callLogoutUser}>
        Log out
      </button>
    </div>
  );
}

export default UserPage;
