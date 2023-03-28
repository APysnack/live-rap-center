import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeLeagueContainer,
  BattlerInfoContainer,
} from './BattlerInfo.styles';
import { DELETE_HOME_LEAGUE_FROM_BATTLER } from './gql';
import { useMutation } from '@apollo/client';
import api from '../../api/api';
import ContentStyleWrapper from '../SharedComponents/ContentContainer/ContentStyleWrapper';

function BattlerInfo({ battler, refetchBattler }) {
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
  });

  const [deleteHomeLeagueFromBattler] = useMutation(
    DELETE_HOME_LEAGUE_FROM_BATTLER,
    {
      onCompleted: refetchBattler,
    }
  );

  const [potentialLeagues, setPotentialLeagues] = useState(null);

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
        (accumulator, battle) => accumulator + (battle.battleUrl + ','),
        ''
      );
      idString = idString.replace(/,\s*$/, '');
      api.fetchYouTubeVideos(idString, updateViews);
    }
    if (battler?.potentialLeagues?.length > 0) {
      setPotentialLeagues(battler.potentialLeagues);
    }
  }, [battler]);

  const deleteHomeLeague = () => {
    deleteHomeLeagueFromBattler({
      variables: { battlerId: battler.id },
    });
  };

  return (
    <ContentStyleWrapper width={400}>
      <BattlerInfoContainer>
        {battler?.league ? (
          <HomeLeagueContainer>
            <div>Home league: {battler.league.leagueName}</div>
            <Link
              to='/league-chat'
              state={{
                leagueId: battler.league.id,
                leagueName: battler.league.leagueName,
              }}
            >
              League Chat
            </Link>
            <button onClick={deleteHomeLeague}>Quit my home league</button>
          </HomeLeagueContainer>
        ) : (
          <div>No Home league selected</div>
        )}
        <div className='horizontal-line' />
        {battler.name}
        <div>Number of battles: {battler.battleCount}</div>
        {battler?.score ? <div>Current Score: {battler.score}</div> : null}
        {
          <div>
            <div>
              Record: {battler.record.wins} - {battler.record.losses}
            </div>
          </div>
        }
        <div>Total Views: {battlerStats.totalViews}</div>
        <div>Average Views: {battlerStats.avgViews}</div>
        {battler?.id ? (
          <Link to={`/battler/${battler.id}`}>
            <div className='battler-page-button'>Battler Page</div>
          </Link>
        ) : null}
      </BattlerInfoContainer>
    </ContentStyleWrapper>
  );
}

export default BattlerInfo;
