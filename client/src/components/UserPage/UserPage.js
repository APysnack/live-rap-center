import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChangeProfileImgForm from "../ChangeProfileImgForm/ChangeProfileImgForm";
import { GET_USER_BATTLER } from "./gql";
import { useQuery } from "@apollo/client";
import api from "../../api/api";

function UserPage({ userId, callLogoutUser }) {
  // current redux state of the user
  const { user } = useSelector((state) => state.user.userState);
  const [profileImgModalOpen, setProfileImgModalOpen] = useState(false);
  const [battler, setBattler] = useState({});
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
  });

  const { loading, data } = useQuery(GET_USER_BATTLER, {
    skip: !user?.id,
    variables: { userId: user?.id },
  });

  const updateViews = (res) => {
    const totalViews = res.reduce(
      (accumulator, video) =>
        accumulator + parseInt(video.statistics.viewCount),
      0
    );
    const avgViews = Math.ceil(totalViews / res.length);
    let stats = { totalViews: totalViews, avgViews: avgViews };
    setBattlerStats({ ...stats });
  };

  useEffect(() => {
    if (data?.battler) {
      setBattler(data.battler);
    }
  }, [data]);

  useEffect(() => {
    if (battler?.battles) {
      // concatenates all battler's battles into idString
      // per youtube API docs, video ids format should be: "id1,id2,id3"
      var idString = battler.battles.reduce(
        (accumulator, battle) => accumulator + (battle.battleUrl + ","),
        ""
      );
      idString = idString.replace(/,\s*$/, "");
      api.fetchYouTubeVideos(idString, updateViews);
    }
  }, [battler]);

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
          {battler?.score ? <div>Current Score: {battler.score}</div> : "bar"}
          {battler?.league ? (
            <div>Home league: {battler.league.leagueName}</div>
          ) : (
            <div>No Home league selected</div>
          )}
          <div>Total Views: {battlerStats.totalViews}</div>
          <div>Average Views: {battlerStats.avgViews}</div>
          <div>G: Top Battles of the week</div>
          <div>G: Active Twitter Spaces??</div>
          <div>G: Settings</div>
          <div>G: FB/Insta/Twitter for modification</div>
          <div>B: Rank</div>
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
