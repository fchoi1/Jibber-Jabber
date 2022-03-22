// Page imports.
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
    // New user logic.
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      // Returns created info.
      return { user, token };
    },
    // Login logic.
    login: async (email, password) => {
      const user = await User.findOne({ email });

      // Throws an error if user input is incorrect or no user has been created with attempted login credentials
      if (!user) {
        throw new AuthenticationError('No user found.');
      }

      const loginPassword = await user.correctPassword(password);

      // Throws an error if password is incorrect
      if (!loginPassword) {
        throw new AuthenticationError('Password is invalid.');
      }

      const token = signToken(user);
      // Returns the login info.
      return { token, user };
    }
  }
};

module.exports = resolvers;
