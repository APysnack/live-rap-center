import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GET_USER_BATTLER } from "./gql";
import { useQuery } from "@apollo/client";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";
import SocialMediaContainer from "../SharedComponents/SocialMediaContainer/SocialMediaContainer";
import BattlerInfo from "./BattlerInfo";

function UserPage({ callLogoutUser }) {
  // current redux state of the user
  const { user } = useSelector((state) => state.user.userState);
  const [battler, setBattler] = useState(null);

  const {
    loading,
    data: battlerData,
    refetch,
  } = useQuery(GET_USER_BATTLER, {
    skip: !user?.id,
    variables: { userId: user?.id },
  });

  useEffect(() => {
    if (battlerData?.battler) {
      setBattler(battlerData.battler);
    }
  }, [battlerData]);

  if (loading) return "Loading...";

  return (
    <>
      {user ? (
        <div>
          <div>
            MY VIEW as a USER who battles -- not others view of my battler page:
          </div>
          <div>Username: {user.username}</div>
          <ImageUploadModal type="profile picture" />
          {battler?.name ? (
            <BattlerInfo battler={battler} refetchBattler={refetch} />
          ) : null}

          {Object.keys(user?.socials).length > 0 ? (
            <SocialMediaContainer socials={user.socials} />
          ) : null}
          <div>G: Top Battles of the week</div>
          <div>G: Active Twitter Spaces??</div>
          <div>B: Rank</div>
          <div>
            B: League chat -- possibly on this page directly for ease of access
          </div>
          <div>B: Crew chat?? Tbd</div>
          <div>
            B: Requests/Messages/Alerts idk for Crew/League/Booking requests
          </div>
          <div>B: Calendar for upcoming events?</div>

          <button style={{ color: "red" }} onClick={callLogoutUser}>
            Log out
          </button>
        </div>
      ) : (
        <div>no user</div>
      )}
    </>
  );
}

export default UserPage;
