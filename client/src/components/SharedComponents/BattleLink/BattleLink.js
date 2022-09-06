import React from 'react';
import { BattleLinkContainer } from './BattleLink.styles';
import Thumbnail from '../Thumbnail/Thumbnail';

function BattleLink({ battle }) {
  const YOUTUBE_IMAGE_URL = `https://i.ytimg.com/vi/${battle.battleUrl}/hqdefault.jpg`;

  return (
    <BattleLinkContainer to={`/battle/${battle.id}`} key={battle.id}>
      <Thumbnail type='battleImage' object={battle} />
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
