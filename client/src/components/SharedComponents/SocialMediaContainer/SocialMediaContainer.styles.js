import styled from 'styled-components';

export const SocialMediaContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.iconsOnly ? 'row' : 'column')};
  gap: ${(props) => (props.iconsOnly ? '1em' : null)};
  margin-top: ${(props) => (props.iconsOnly ? '1.5em' : null)};
`;
