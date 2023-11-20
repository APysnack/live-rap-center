import React from 'react';
import { BattleProjectionsContainer } from './AddBattleToEvent.styles';

function BattleProjections({ battlers }) {
  return (
    <BattleProjectionsContainer>
      <div className='view-stats-container'>
        {battlers?.length > 0
          ? battlers.map((battler, i) => (
              <div className='view-stats'>
                <div>Total: {battler.totalViews}</div>
                <div>Average: {battler.averageViews}</div>
                <div>Median: {battler.medianViews}</div>
                <div>Deviation: {battler.averageLeagueZscore}</div>
              </div>
            ))
          : 'No battlers for this league'}
      </div>

      <div className='battle-projections'>placeholder</div>
    </BattleProjectionsContainer>
  );
}

export default BattleProjections;
