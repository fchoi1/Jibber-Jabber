import {gql} from '@apollo/client'


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
        users{
            _id
            username
        }
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
  query ChannelMe {
    channelMe {
      _id
      createdAt
      users {
        _id
        username
        email
      }
      channelName
      messages {
        textValue
        sender {
          username
        }
        createdAt
      }
    }
  }
`;