import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GET_USER_BATTLER, GET_USER } from "./gql";
import { useQuery } from "@apollo/client";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";
import SocialMediaContainer from "../SharedComponents/SocialMediaContainer/SocialMediaContainer";
import BattlerInfo from "./BattlerInfo";

function UserPage({ callLogoutUser }) {
  // current redux state of the user
  const { user } = useSelector((state) => state.user.userState);
  const [battler, setBattler] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    loading,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    skip: user?.id ? false : true,
    variables: { id: user?.id },
  });

  const { data: battlerData, refetch: refetchBattler } = useQuery(
    GET_USER_BATTLER,
    {
      skip: currentUser?.id ? false : true,
      variables: { userId: currentUser?.id },
    }
  );

  useEffect(() => {
    if (battlerData?.battler) {
      setBattler(battlerData.battler);
    }
  }, [battlerData]);

  useEffect(() => {
    if (userData?.user) {
      setCurrentUser(userData.user);
    }
  }, [userData]);

  if (loading) return "Loading...";

  return (
    <>
      {currentUser ? (
        <div>
          <div>
            MY VIEW as a USER who battles -- not others view of my battler page:
          </div>
          <div>Username: {currentUser.username}</div>
          <ImageUploadModal
            type="profile picture"
            refetch={refetchUser}
            object={currentUser}
          />
          {battler?.name ? (
            <BattlerInfo battler={battler} refetchBattler={refetchBattler} />
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
