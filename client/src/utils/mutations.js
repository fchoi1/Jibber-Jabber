import { gql } from '@apollo/client';

export const QUERY_Users = gql`
query {
  users {
    _id
    username
    email 
  }
}
`;
export const Query_Channel = gql`
query($id: ID!){
  channel(_id: $id) {
    _id
    users {
      _id
    }
    messages {
      _id
      textValue
      sender {
        _id
      }
    }
  }
}`
export const Query_Me = gql`
query me{
  me {
    _id
    username
    channelModel {
      _id
      users {
        _id
        username
      }
      messages {
        textValue
        sender {
          username
        }
      }
    }
  }
}`

export const Mutation_findUser = gql`
mutation($email: String!){
  findUser(email: $email) {
    username
  }
}
`

export const Mutation_Login = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
    user {
      username
      createdAt
    }
  }
}`


export const Mutation_signup = gql`
  mutation($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        createdAt
      }
    }
}
`
export const Mutation_SendMessage = gql`
mutation sendMessage($id: ID, $textValue: String!, $senderId: Userss!){
  sendMessage(_id: $id, textValue: $textValue, senderId: $senderId ) {
    users {
      email
    }
    messages {
      textValue
    }
  }
}
`