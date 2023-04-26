import React, { Fragment } from 'react';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import {
  StyledBattleContainer,
  BattleContentContainer,
} from './BattlePage.styles';
import { formatDate } from '../../utils/helperFunctions';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = process.env;
const VIDEO_WIDTH = '960';
const VIDEO_HEIGHT = '540';

function BattleContainer({ stats, youtubeId, battle }) {
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
          <div>
            {stats?.snippet ? (
              <div>
                <Link to={`/league/${battle.league.id}`}>
                  <Avatar
                    src={REACT_APP_SERVER_URL + battle.league.logoUrl}
                    sx={{ width: 400, height: 100 }}
                    className='battlerImage'
                    variant={'rounded'}
                  />
                </Link>

                <div>{stats.snippet.title}</div>
                <div>{stats.statistics.viewCount} views</div>
                <div>{stats.statistics.likeCount} likes</div>
                <div>{formatDate(stats.snippet.publishedAt, [])}</div>
                {battle.battlers.map((battler, i) => (
                  <Fragment key={battler.id}>
                    <div className={`battler-${i}`}>
                      {battler.name.toUpperCase()}
                    </div>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </ContentContainer>
      </BattleContentContainer>
    </>
  ) : null;
}

export default BattleContainer;
