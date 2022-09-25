import styled from 'styled-components';

export const BattlerBookingFormContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .static-container {
    margin: 0.5em;
    padding: 1em;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
  }
  .field-container {
    margin-top: 1em;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
  }
`;
