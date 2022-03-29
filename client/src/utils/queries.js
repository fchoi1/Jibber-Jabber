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
      }
      friends {
        _id
        username
        email
      }
    }
  }
`;

export const QUERY_CHANNEL_ME = gql`
  query queryChannels($user: ID) {
    channels(user: $user) {
      channelName
      _id
      users {
        _id
        username
        email
      }
      messages {
        textValue
        createdAt
        sender {
          _id
          username
        }
      }
    }
  }
`;
