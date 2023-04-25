import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from 'styled-components';

function StarSelector({
  battler,
  updateStarState,
  updateCheckState,
  checkDisabled,
}) {
  const battlerId = battler.id;
  const theme = useTheme();

  const [isSelected, setIsSelected] = useState(false);

  const updateSelected = (e) => {
    updateCheckState(battlerId, e.target.checked);
    setIsSelected(e.target.checked);
  };

  return (
    <div className={isSelected ? 'star-selector selected' : 'star-selector'}>
      <div className='battler-name'>{battler.name}</div>

      <div className='checkbox-selection'>
        <div>Lyricism</div>
        <StarRatingComponent
          name={'lyricism-' + battler.id}
          id='lyricism'
          onStarClick={(value) => updateStarState(battlerId, value, 'lyricism')}
          emptyStarColor={theme.primary}
        />
      </div>

      <div className='checkbox-selection'>
        <div>Performance</div>
        <StarRatingComponent
          name={'performance-' + battler.id}
          id='performance'
          onStarClick={(value) =>
            updateStarState(battlerId, value, 'performance')
          }
          emptyStarColor={theme.primary}
        />
      </div>

      <div className='checkbox-selection'>
        <div>WINNER</div>
        <Checkbox
          disabled={checkDisabled}
          onChange={(e) => updateSelected(e)}
          sx={{
            '&.Mui-checked': {
              color: theme.tertiary,
            },
          }}
        />
      </div>
    </div>
  );
}

export default StarSelector;
