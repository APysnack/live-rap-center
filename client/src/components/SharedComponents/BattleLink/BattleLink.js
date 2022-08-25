import React from 'react';
import { BattleLinkContainer } from './BattleLink.styles';
import { Avatar } from '@mui/material';
const { REACT_APP_SERVER_URL } = process.env;
const THUMBNAIL_WIDTH = 100;
const THUMBNAIL_HEIGHT = 100;

function BattleLink({ battle }) {
  return (
    <BattleLinkContainer to={`/battle/${battle.id}`} key={battle.id}>
      {battle.thumbnail ? (
        <Avatar
          src={REACT_APP_SERVER_URL + battle.thumbnail}
          sx={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
          className='battleThumb'
        />
      ) : (
        <Avatar
          src={null}
          sx={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
          className='battleThumb'
        />
      )}
      {battle.battlers.map((battler, i) => (
        <div key={battler.id}>
          {battler.name} {i % 2 === 0 ? <span>versus</span> : null}
        </div>
      ))}
      <div>Rating: {battle.score > 0 ? battle.score : 'N/A'}</div>
    </BattleLinkContainer>
  );
}

export default BattleLink;
