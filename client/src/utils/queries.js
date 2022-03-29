import { gql } from '@apollo/client';

export const QUERY_CHANNEL = gql`
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

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      channelModel {
        _id
        channelName
      }
      friends {
        _id
        username
        email
      }
    }
  }
`;
