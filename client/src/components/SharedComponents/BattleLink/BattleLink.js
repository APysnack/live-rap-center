import React from 'react';
import { BattleLinkContainer } from './BattleLink.styles';
import Thumbnail from '../Thumbnail/Thumbnail';
import StyledRating from '../../SharedComponents/StyledRating/StyledRating';

function BattleLink({ battle }) {
  return (
    <BattleLinkContainer to={`/battle/${battle.id}`} key={battle.id}>
      <div className='title-container'>
        {battle.battlers.map((battler, i) => (
          <div key={battler.id} className={`battler-${i}`}>
            {battler.name.toUpperCase()} {i % 2 === 0 ? <span>VS</span> : null}
          </div>
        ))}
      </div>
      <div className='thumbnail-container'>
        <Thumbnail type='battleImage' object={battle} />
      </div>

      <div>
        {battle.score > 0 ? (
          <StyledRating value={battle.score}></StyledRating>
        ) : (
          'N/A'
        )}
      </div>
      <div className='league-name-text'>{battle.leagueName}</div>
    </BattleLinkContainer>
  );
}

export default BattleLink;
