import React from 'react';
import { StyledRatingContainer } from './StyledRating.styles';
import Square from '@mui/icons-material/Square';

function StyledRating({ value, fontSize = '0.7rem' }) {
  const roundToDecimal = (number) => {
    return Math.round((number / 10) * 2) / 2;
  };

  return (
    <StyledRatingContainer
      name='customized-color'
      defaultValue={roundToDecimal(value)}
      precision={0.5}
      max={10}
      sx={{
        fontSize: fontSize,
      }}
      icon={<Square fontSize='inherit' />}
      emptyIcon={<Square fontSize='inherit' />}
      disabled={true}
    />
  );
}

export default StyledRating;
