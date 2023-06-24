import React, { useState, useEffect } from 'react';
import { StyledRatingContainer } from './StyledRating.styles';
import Square from '@mui/icons-material/Square';

function StyledRating({ value, fontSize = '0.7rem' }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(roundToDecimal(value));
  }, [value]);

  const roundToDecimal = (number) => {
    return Math.round((number / 10) * 2) / 2;
  };

  const handleRatingChange = (event, newValue) => {
    // Update the rating state when the rating changes
    setRating(newValue);
  };

  return (
    <StyledRatingContainer
      name='customized-color'
      value={rating}
      onChange={handleRatingChange}
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
