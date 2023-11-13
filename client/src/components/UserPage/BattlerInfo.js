import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeLeagueContainer,
  BattlerInfoContainer,
} from './BattlerInfo.styles';
import ContentStyleWrapper from '../SharedComponents/ContentContainer/ContentStyleWrapper';

function BattlerInfo({ battler }) {
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
                <img src={battler.league.logoUrl}></img>

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
        <div>Total Views: {battler.totalViews}</div>
        <div>Average Views: {battler.averageViews}</div>
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
