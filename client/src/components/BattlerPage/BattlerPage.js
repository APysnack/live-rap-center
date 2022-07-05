import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_BATTLER } from "./gql";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import api from "../../api/api";
import LeagueOwnerControls from "./LeagueOwnerControls";
import SocialMediaContainer from "../SharedComponents/SocialMediaContainer/SocialMediaContainer";

function BattlerPage() {
  let { battlerId } = useParams();
  const [flashMessage, setFlashMessage] = useState("");
  const [battlerSocials, setBattlerSocials] = useState({});
  const [battler, setBattler] = useState(null);
  const [userViewingPageIsThisBattler, setUserViewingPageIsThisBattler] =
    useState(false);
  const [userViewingPageIsLeagueOwner, setUserViewingPageIsLeagueOwner] =
    useState(false);
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
  });

  const { user } = useSelector((state) => state.user.userState);

  const { loading, data } = useQuery(GET_BATTLER, {
    variables: { id: battlerId },
  });

  // makes gql query for a battler, if found
  // sets this as the "battler" for this page
  useEffect(() => {
    if (data?.battler) {
      setBattler(data.battler);
      if (
        data.battler.user?.id &&
        user?.id &&
        parseInt(data.battler.user?.id) === parseInt(user?.id)
      ) {
        setUserViewingPageIsThisBattler(true);
      }
    }
  }, [data]);

  // NOTE/POSSIBLE TO DO!!!! ensure that this logic does not apply to any league owner, only owner of THIS league
  useEffect(() => {
    if (user?.roles?.includes("league owner")) {
      setUserViewingPageIsLeagueOwner(true);
    }
  }, [user]);

  useEffect(() => {
    if (battler?.battles) {
      // concatenates all battler's battles into idString
      // per youtube API docs, video ids format should be: ["id1,id2,id3"]
      var idString = battler.battles.reduce(
        (accumulator, battle) => accumulator + (battle.battleUrl + ","),
        ""
      );
      idString = idString.replace(/,\s*$/, "");
      api.fetchYouTubeVideos(idString, updateViews);
    }
    if (battler?.user?.socialMediaLinks.length > 0) {
      let newSocials = {};
      battler.user.socialMediaLinks.map((social) => {
        let tempObj = {
          [social.socialMediaPlatformName]: {
            platform_id: social.id,
            url: social.url,
          },
        };
        newSocials = { ...newSocials, ...tempObj };
        console.log(newSocials);
      });
      setBattlerSocials({ ...newSocials });
    }
  }, [battler]);

  useEffect(() => {
    console.log(battlerSocials);
  }, [battlerSocials]);

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

  if (loading) return "Loading...";

  return (
    <>
      <div>{flashMessage}</div>
      {battler ? (
        <div>
          {userViewingPageIsThisBattler ? (
            <div>This is your battler page</div>
          ) : null}
          <div>Battler Name: {battler.name}</div>
          {battler?.user?.isVerified ? (
            <div>This battler has an account with LRC</div>
          ) : (
            <div>This battler is not verified with LRC</div>
          )}
          {battler?.league?.leagueName ? (
            <div>This battler represents {battler.league.leagueName}</div>
          ) : (
            <div>This battler has not confirmed a homeleague</div>
          )}
          <div>This battler's rating is {battler.score}</div>
          <div>Total Views: {battlerStats.totalViews}</div>
          <div>Average Views: {battlerStats.avgViews}</div>
          {Object.keys(battlerSocials).length > 0 ? (
            <SocialMediaContainer socials={battlerSocials} />
          ) : null}
          <LeagueOwnerControls
            battler={battler}
            leagueOwner={userViewingPageIsLeagueOwner ? user : null}
            setFlashMessage={setFlashMessage}
          />
        </div>
      ) : null}
    </>
  );
}

export default BattlerPage;
