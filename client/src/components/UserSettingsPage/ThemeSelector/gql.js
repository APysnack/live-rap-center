import { gql } from '@apollo/client';

export const UPDATE_SELECTED_THEME = gql`
  mutation UpdateSelectedTheme($userId: ID!, $themeName: String!) {
    updateSelectedTheme(input: { userId: $userId, themeName: $themeName }) {
      id
    }
  }
`;
