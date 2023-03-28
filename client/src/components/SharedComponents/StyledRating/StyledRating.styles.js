import Rating from '@mui/material/Rating';
import styled from 'styled-components';

export const StyledRatingContainer = styled(Rating)`
  .MuiRating-iconFilled {
    color: ${(props) => props.theme.tertiary};
  }

  &.Mui-disabled {
    opacity: 1 !important;
  }
`;
