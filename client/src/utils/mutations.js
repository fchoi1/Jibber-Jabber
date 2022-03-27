import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
mutation SendMessage($textValue: String!, $senderId: ID!, $channelId: ID) {
    sendMessage(textValue: $textValue, senderId: $senderId, channelId: $channelId) {
      _id
      messages {
        _id
        textValue
        sender {
          _id
          username
          email
        }
        createdAt
      }
    }
  }
`;
