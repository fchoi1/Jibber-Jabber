const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
  }

  type Query {
    me: User
  }

  type Message {
    _id: ID
    user: User
    textContent: String
    timeStamp: Int
  }

  type Chat {
    _id: ID
    name: String
    messages: [Message]
    users: [User]
  }
`;
module.exports = typeDefs;
