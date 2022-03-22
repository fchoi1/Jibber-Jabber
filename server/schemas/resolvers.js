// Page imports.
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");

// Queries - obtains information.
const resolvers = {
  Query: {
    me: async (parent, args, context) => {}
  },
  users: async () => {
    return User.find();
  },
  user: async (parent, { username }) => {
    return User.findOne({ username });
  },
  // Mutations - creates, updates or deletes.
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    },
    login: async () => {}
  }
};

module.exports = resolvers;
