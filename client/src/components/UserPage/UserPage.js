import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChangeProfileImgForm from "../ChangeProfileImgForm/ChangeProfileImgForm";

function UserPage({ userId, callLogoutUser }) {
  // current redux state of the user
  const { user } = useSelector((state) => state.user.userState);
  const [profileImgModalOpen, setProfileImgModalOpen] = useState(false);

  const openImageModal = () => {
    setProfileImgModalOpen(true);
  };

  const closeImageModal = () => {
    setProfileImgModalOpen(false);
  };

  return (
    <UserPageWrapper>
      {user ? (
        <div>
          <div>
            MY VIEW as a USER who battles -- not others view of my battler page:
          </div>
          <div>{user.username}</div>
          <Avatar
            src={"http://localhost:3001" + user?.profile_picture_url}
            sx={{ width: 150, height: 150 }}
            onClick={openImageModal}
            className="profileImg"
          />
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
          <ChangeProfileImgForm
            isOpen={profileImgModalOpen}
            onClose={closeImageModal}
          />
        </div>
      ) : (
        <div>no user</div>
      )}
    </UserPageWrapper>
  );
}

export default UserPage;

const UserPageWrapper = styled.div`
  .profileImg {
    border: 4px solid black;
  }

  .profileImg:hover {
    cursor: pointer;
  }
`;
