import styled from 'styled-components';
import { MOBILE_VIEW_WIDTH } from '../../globalConstants';

export const UserSettingsPageContainer = styled.div`
  display: flex;
  align-items: center;

  .content-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100vw;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      flex-direction: column;
    }
  }

  .cc-wrapper {
    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
    }
  }
`;
