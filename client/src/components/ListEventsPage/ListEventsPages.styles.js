import styled from 'styled-components';

export const EventInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .header-container {
    margin: 0.5em 0 0.5em 0;
    padding: 0.3em;
    width: 50%;
  }

  .flyer-img {
    margin-top: 0.7em;
  }

  .subheading {
    font-size: 2em;
    font-weight: 600;
    color: ${(props) => props.theme.primaryContrast};
  }

  .details-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    gap: 0.5em;

    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.3em;

      .address {
        width: 70%;
      }
      .admission {
        width: 30%;
      }
    }
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.5em;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 3px;
    gap: 0.8em;
  }

  .subtext {
    font-size: 0.8em;
  }

  .link-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 80%;
    background-color: ${(props) => props.theme.formBackground};
    border-radius: 5px;
    gap: 0.4em;
  }
`;
