const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {}
  },
  users: async () => {
    return User.find()
  
  },
  user: async (parent, { username }) => {
    return User.findOne({ username })
 
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      return user;
    },
    login: async () => {}
  }
};

module.exports = resolvers;
