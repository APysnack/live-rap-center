import styled from 'styled-components';

export const VotePanelContainer = styled.div`
  .star-selector-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;

    .star-selector {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      border-radius: 20px;
      padding: 2em;
      width: 30em;
      gap: 1.5em;
      background-color: ${(props) => props.theme.formBackground};

      .battler-name {
        font-size: 2em;
        font-weight: 600;
      }

      .checkbox-selection {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
      }

      .dv-star-rating-star {
        font-size: 1.2em;
      }
    }

    .selected {
      border: 3px solid ${(props) => props.theme.tertiary};
    }
  }
`;
