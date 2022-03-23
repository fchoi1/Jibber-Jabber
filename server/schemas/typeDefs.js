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

  type Channel {
    _id: ID
    name: String
    messages: [Message]
    users: [User]
  }
`;
module.exports = typeDefs;
