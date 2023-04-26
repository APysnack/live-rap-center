import React, { useEffect, Fragment, useState } from 'react';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import {
  StyledBattleContainer,
  BattleContentContainer,
  StyledStatsContainer,
  BattlerLinkWrapper,
} from './BattlePage.styles';
import { formatDate } from '../../utils/helperFunctions';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import ThumbUp from '@mui/icons-material/ThumbUp';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Thumbnail from '../SharedComponents/Thumbnail/Thumbnail';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import StyledRating from '../SharedComponents/StyledRating/StyledRating';

const { REACT_APP_SERVER_URL } = process.env;
const VIDEO_WIDTH = '960';
const VIDEO_HEIGHT = '540';

function BattleContainer({ stats, youtubeId, battle }) {
  const [votesCount, setVotesCount] = useState({});

  useEffect(() => {
    if (battle?.battleVotes) {
      const winningVotesCount = countWinningVotes(battle);
      setVotesCount(winningVotesCount);
    }
  }, [battle]);

  function countWinningVotes(battle) {
    const winningVotesCount = battle.battlers.reduce((acc, { id }) => {
      acc[id] = 0;
      return acc;
    }, {});

    battle.battleVotes.forEach(({ scores }) => {
      scores.forEach(({ battlerId, outcome }) => {
        if (outcome === 'win') {
          winningVotesCount[battlerId]++;
        }
      });
    });

    return winningVotesCount;
  }

  return stats ? (
    <>
      <BattleContentContainer>
        <ContentContainer
          flexDirection='column'
          justifyContent='flex-start'
          width={1000}
          height={750}
        >
          <StyledBattleContainer>
            <div className='header-container'>
              <div className='title-text'>
                {battle.battlers.map((battler, i) => (
                  <Fragment key={battler.id}>
                    <div className={`battler-${i}`}>
                      {battler.name.toUpperCase()}
                    </div>
                    {i % 2 === 0 && <div>VS</div>}
                  </Fragment>
                ))}
              </div>
            </div>

            <iframe
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              src={'https://www.youtube.com/embed/' + youtubeId}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;'
            ></iframe>
          </StyledBattleContainer>
        </ContentContainer>
        <ContentContainer width={600} height={750}>
          {stats?.snippet ? (
            <StyledStatsContainer>
              <div className='battle-stats'>
                <div className='stat-with-icon'>
                  <CalendarMonth />
                  <div>
                    {formatDate(stats.snippet.publishedAt, ['monthInNumbers'])}
                  </div>
                </div>

                <div className='stat-with-icon'>
                  <Visibility />
                  <div>{stats.statistics.viewCount}</div>
                </div>

                <div className='stat-with-icon'>
                  <ThumbUp />
                  <div>{stats.statistics.likeCount}</div>
                </div>

                {battle.battleStatus === 'closed' ? <Lock /> : <LockOpen />}
              </div>
              <div className='logo-container'>
                <Link to={`/league/${battle.league.id}`}>
                  <Avatar
                    src={REACT_APP_SERVER_URL + battle.league.logoUrl}
                    sx={{ width: 400, height: 100 }}
                    className='battlerImage'
                    variant={'rounded'}
                  />
                </Link>
              </div>

              <div className='battle-results-panel'>
                {battle.battlers.map((battler, i) => (
                  <BattlerLinkWrapper
                    key={battler.id}
                    className={`${
                      battle.battleWinner?.id === battler.id
                        ? 'battle-winner'
                        : ''
                    }`}
                  >
                    <div className={`battler-${i} battler-title`}>
                      <div>{battler.name.toUpperCase()}</div>
                      {battler?.user?.isVerified ? (
                        <VerifiedUserIcon
                          className='verified-icon'
                          style={{ fontSize: '1em' }}
                        />
                      ) : null}
                    </div>
                    <Thumbnail
                      type='battlerImage'
                      object={battler}
                      fillParentContainer={false}
                      width={'7em'}
                      height={'7em'}
                    />
                    <StyledRating
                      value={battler.score}
                      fontSize='0.85em'
                    ></StyledRating>
                    <div className='votes-count'>
                      {`${votesCount[battler.id]} ${
                        votesCount[battler.id] === 1 ? 'vote' : 'votes'
                      }`}
                    </div>
                  </BattlerLinkWrapper>
                ))}
              </div>
            </StyledStatsContainer>
          ) : null}
        </ContentContainer>
      </BattleContentContainer>
    </>
  ) : null;
}

export default BattleContainer;
