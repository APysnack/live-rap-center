import React from 'react';

function BattlerStats({ battler, battlerViews }) {
  const numFollowersText = () => {
    if (battler?.followerCount === 1) {
      return `${battler?.followerCount} follower`;
    } else {
      return `${battler?.followerCount} followers`;
    }
  };

  return (
    <div>
      {battler?.league?.leagueName ? (
        <div>This battler represents {battler.league.leagueName}</div>
      ) : (
        <div>This battler has not confirmed a homeleague</div>
      )}
      <div>This battler's rating is {battler.score}</div>
      <div>Total Views: {battlerViews.totalViews}</div>
      <div>Average Views: {battlerViews.avgViews}</div>
      <div>Wins: {battler?.record?.wins}</div>
      <div>Losses: {battler?.record?.losses}</div>
      <div>{numFollowersText()}</div>
    </div>
  );
}

export default BattlerStats;
