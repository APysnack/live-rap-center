import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BATTLE } from "./gql";
import { useQuery } from "@apollo/client";
import api from "../../api/api";

const VIDEO_WIDTH = "480";
const VIDEO_HEIGHT = "270";

function BattlePage() {
  let { battleId } = useParams();
  const [battle, setBattle] = useState({});
  const [youtubeId, setYoutubeId] = useState("");
  const [battlers, setBattlers] = useState({});

  const { loading, data } = useQuery(GET_BATTLE, {
    variables: { id: battleId },
  });

  useEffect(() => {
    if (youtubeId) {
      api.fetchYouTubeVideo(youtubeId, setBattle);
    }
  }, [youtubeId]);

  useEffect(() => {
    if (data?.battle) {
      setYoutubeId(data.battle.battleUrl);
      setBattlers({ ...data.battle.battlers });
    }
  }, [data]);

  if (loading) return "Loading...";

  return (
    <>
      {battle?.snippet ? (
        <div>
          <div>{battle.snippet.title}</div>
          <div>{battle.statistics.viewCount} views</div>
          <div>{battle.statistics.likeCount} likes</div>
          <div>{battle.snippet.channelId}</div>

          {battlers
            ? Object.keys(battlers).map((battler, i) =>
                battlers[battler]?.user?.username ? (
                  <div key={i}>{battlers[battler].user.username} is a user</div>
                ) : null
              )
            : null}

          <iframe
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            src={"https://www.youtube.com/embed/" + youtubeId}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
          ></iframe>
        </div>
      ) : (
        <div>Battle could not be found</div>
      )}
    </>
  );
}

export default BattlePage;
