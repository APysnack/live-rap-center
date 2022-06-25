import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import LeagueInvitations from "./LeagueInvitations";

function BattlerInfo({ battler }) {
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
  });

  useEffect(() => {
    console.log(battler.potentialLeagues);
  }, []);

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

  return (
    <div>
      Battler Stats
      {battler?.score ? <div>Current Score: {battler.score}</div> : null}
      {battler?.league ? (
        <div>Home league: {battler.league.leagueName}</div>
      ) : (
        <div>No Home league selected</div>
      )}
      {battler?.id ? (
        <Link to={`/battler/${battler.id}`}>My public battler page</Link>
      ) : null}
      <div>Total Views: {battlerStats.totalViews}</div>
      <div>Average Views: {battlerStats.avgViews}</div>
      {battler?.potentialLeagues?.length > 0 ? (
        <LeagueInvitations battler={battler} />
      ) : null}
    </div>
  );
}

export default BattlerInfo;
