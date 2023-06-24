import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      crews {
        id
        crewChatId
        name
      }
      battler {
        id
        league {
          id
          leagueName
          logoUrl
        }
      }
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query ChatMessages($chatId: ID!, $chatType: String!) {
    chatMessages(chatId: $chatId, chatType: $chatType) {
      id
      body
      user {
        id
        username
      }
    }
  }
`;
