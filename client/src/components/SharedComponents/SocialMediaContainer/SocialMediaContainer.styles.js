import styled from 'styled-components';

export const SocialMediaContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LinkContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.primaryContrast};
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  border-radius: 6px;
  font-size: 0.9em;
  padding: 0.3em 0em 0.3em 0em;
  width: 14em;
  color: ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
    cursor: pointer;
  }
`;
