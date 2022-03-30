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
  type Auth {
    token: ID!
    user: User
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
    channels(user: ID): [Channel]
    channelMe: [Channel]
    messages: [Message]
    deleteChannels: Channel
    deleteMessages: Message
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createChannel(users: [Userss]!, channelName: String!): Channel
    sendMessage(channelId: ID, textValue: String!, senderId: ID!): Channel
    createMessage(textValue: String!): Message
    addFriend(user: ID!): User
  }
`;
module.exports = typeDefs;