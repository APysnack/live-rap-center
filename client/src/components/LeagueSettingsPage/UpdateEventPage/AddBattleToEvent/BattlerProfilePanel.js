import React from 'react';
import { BattlerProfilePanelContainer } from './AddBattleToEvent.styles';
import Thumbnail from '../../../SharedComponents/Thumbnail/Thumbnail';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import StyledRating from '../../../SharedComponents/StyledRating/StyledRating';

function BattlerProfilePanel({ battler, i, votesCount }) {
  return (
    <BattlerProfilePanelContainer key={battler.id}>
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
      <StyledRating value={battler.score} fontSize='0.85em'></StyledRating>
    </BattlerProfilePanelContainer>
  );
}

export default BattlerProfilePanel;
