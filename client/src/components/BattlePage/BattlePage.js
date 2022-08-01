import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BATTLE } from "./gql";
import { useQuery } from "@apollo/client";
import api from "../../api/api";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";
import { useSelector } from "react-redux";
import VoteSubmissionPanel from "./VoteSubmissionPanel/VoteSubmissionPanel";
import { BattlePageContainer } from "./BattlePage.styles";
import VoteDetails from "./VoteDetails/VoteDetails";

const VIDEO_WIDTH = "480";
const VIDEO_HEIGHT = "270";

function BattlePage() {
  const { user } = useSelector((state) => state.user.userState);
  const [userViewingPageIsAdmin, setUserViewingPageIsAdmin] = useState(false);
  const { battleId } = useParams();
  const [battle, setBattle] = useState({});
  const [youtubeStats, setYoutubeStats] = useState({});
  const [youtubeId, setYoutubeId] = useState("");

  const updateBattle = (data) => {
    setBattle(data.battle);
    setYoutubeId(data.battle.battleUrl);
  };

  useEffect(() => {
    if (user?.roles?.includes("admin")) {
      setUserViewingPageIsAdmin(true);
    }
  }, [user]);

  const { loading, refetch } = useQuery(GET_BATTLE, {
    variables: { id: battleId },
    onCompleted: updateBattle,
  });

  // fetches video from youtube API
  useEffect(() => {
    console.log(battle);
    if (youtubeId) {
      api.fetchYouTubeVideo(youtubeId, setYoutubeStats);
    }
  }, [youtubeId]);

  if (loading) return "Loading...";

  return (
    <BattlePageContainer>
      {youtubeStats?.snippet ? (
        <div>
          <div>{youtubeStats.snippet.title}</div>
          <div>{youtubeStats.statistics.viewCount} views</div>
          <div>{youtubeStats.statistics.likeCount} likes</div>
          {/* add link to channel later */}
          <div>{youtubeStats.snippet.channelId}</div>
          <iframe
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            src={"https://www.youtube.com/embed/" + youtubeId}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
          ></iframe>
          {battle.votingStatus === "open" ? (
            <VoteSubmissionPanel
              user={user}
              battle={battle}
              refetchBattle={refetch}
            />
          ) : (
            "Voting for this battle is closed"
          )}

          {battle?.battlers
            ? Object.keys(battle.battlers).map((battler, i) =>
                battle.battlers[battler]?.user?.username ? (
                  <div key={i}>
                    {battle.battlers[battler].user.username} is a user
                  </div>
                ) : null
              )
            : null}

          {/* currently gives a key error, should be resolved when transformed into component */}
          {battle?.battleVotes.length > 0
            ? battle.battleVotes.map((vote) => (
                <VoteDetails key={vote.id} vote={vote} />
              ))
            : null}
          {userViewingPageIsAdmin ? (
            <div>
              <div>Edit Battle Thumbnail: Admin Only</div>
              <ImageUploadModal
                type="battle thumbnail"
                object={battle}
                refetch={refetch}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div>Battle could not be found</div>
      )}
    </BattlePageContainer>
  );
}

export default BattlePage;
