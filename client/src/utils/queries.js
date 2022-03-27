import { gql } from '@apollo/client';

export const QUERY_CHANNELS = gql`
  query SingleChannel($channelId: ID!) {
    singleChannel(channelId: $channelId) {
      _id
      users {
        username
        _id
      }
      messages {
        textValue
        sender {
          username
          _id
        }
        createdAt
        _id
      }
      channelName
    }
  }
`;
