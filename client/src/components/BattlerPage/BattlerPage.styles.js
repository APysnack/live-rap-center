import styled from 'styled-components';

export const BattlerPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .user-details-container {
    display: flex;
  }

  .battler-name-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    font-weight: 600;
    margin-top: 0.2em;
    gap: 0.3em;
    width: 10em;
    margin-bottom: 0.5em;

    .verified-icon {
      color: ${(props) => props.theme.primaryContrast};
    }
  }
  .no-league {
    margin-top: 2em;
    margin-bottom: 2.5em;
    font-size: 1.2em;
    font-weight: 500;
  }

  .stats-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 2em;
    border-radius: 10px;
    font-size: 1.2em;
    background-color: ${(props) => props.theme.formBackground};
    width: 21em;
    height: 10em;
    margin-bottom: 1em;
  }
`;

export const AdminPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LeagueOwnerPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title-text {
    font-size: 1.5em;
    font-weight: 600;
  }
`;

export const BattlerStatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title-text {
    font-size: 1.5em;
    font-weight: 600;
  }

  .header-container {
    margin-top: 0.3em;
    margin-bottom: 0.5em;
    width: 14em;
  }
`;

export const SocialMediaContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .header-container {
    margin-top: 0.3em;
    margin-bottom: 0.5em;
    width: 14em;
  }

  .title-text {
    font-size: 1.5em;
    font-weight: 600;
  }
`;
