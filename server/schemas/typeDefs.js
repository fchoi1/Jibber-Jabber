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
    textValue: String
    sender: User
    createdAt: String
  }

  type Channel {
    _id: ID
    users: [User]
    messages: [Message]
    channelName: String
  }

  type User {
    _id: ID
    username: String
    email: String
    channelModel: [Channel]
    friends: [User]
  }

  input Userss {
    _id: ID
  }

  input Messagess {
    _id: ID
  }

  type Query {
    users(username: String): [User]
    singleChannel(channelId: ID!): Channel
    channels: [Channel]
    messages: [Message]
    deleteChannels: Channel
    deleteMessages: Message
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createChannel(users: [Userss]!, channelName: String!): Channel
    sendMessage(channelId: ID, textValue: String!, senderId: ID!): Channel
    createMessage(textValue: String!): Message
  }
`;
module.exports = typeDefs;
