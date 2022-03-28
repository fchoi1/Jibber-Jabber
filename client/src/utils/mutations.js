import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($textValue: String!, $senderId: ID!, $channelId: ID) {
    sendMessage(
      textValue: $textValue
      senderId: $senderId
      channelId: $channelId
    ) {
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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
