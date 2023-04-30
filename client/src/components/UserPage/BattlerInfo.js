import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeLeagueContainer,
  BattlerInfoContainer,
} from './BattlerInfo.styles';
import api from '../../api/api';
import ContentStyleWrapper from '../SharedComponents/ContentContainer/ContentStyleWrapper';

const { REACT_APP_SERVER_URL } = process.env;

function BattlerInfo({ battler }) {
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
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
  }, [battler]);

  return (
    <ContentStyleWrapper width={'20vw'}>
      <BattlerInfoContainer>
        {battler?.league ? (
          <HomeLeagueContainer>
            <Link
              to='/chat'
              state={{
                leagueId: battler.league.id,
                leagueName: battler.league.leagueName,
                type: 'league',
              }}
            >
              <div className='league-chat-container'>
                <img src={REACT_APP_SERVER_URL + battler.league.logoUrl}></img>

                <div className='league-chat-text'>LEAGUE CHAT</div>
              </div>
            </Link>
          </HomeLeagueContainer>
        ) : (
          <div>No Home league selected</div>
        )}
        <div className='horizontal-line' />
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
          <Link
            className='lrc-button'
            style={{
              marginTop: '1.75em',
              padding: '0.5em 3em 0.5em 3em',
            }}
            to={`/battler/${battler.id}`}
          >
            <div>Battler Page</div>
          </Link>
        ) : null}
      </BattlerInfoContainer>
    </ContentStyleWrapper>
  );
}

export default BattlerInfo;
