import React, { Fragment } from 'react';
import { BattleLinkContainer } from './BattleLink.styles';
import Thumbnail from '../Thumbnail/Thumbnail';
import StyledRating from '../../SharedComponents/StyledRating/StyledRating';

function BattleLink({ battle, size = 'medium' }) {
  return (
    <BattleLinkContainer
      to={`/battle/${battle.id}`}
      key={battle.id}
      size={size}
    >
      <div className='title-container'>
        {battle.title ? (
          <div>{battle.title}</div>
        ) : (
          <>
            {battle.battlers.map((battler, i) => (
              <Fragment key={battler.id}>
                <div className={`battler-${i}`}>
                  {battler.name.toUpperCase()}
                </div>
                {i % 2 === 0 && <div>VS</div>}
              </Fragment>
            ))}
          </>
        )}
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
      <div className='league-name-text'>{battle.league.leagueName}</div>
    </BattleLinkContainer>
  );
}

export default BattleLink;
