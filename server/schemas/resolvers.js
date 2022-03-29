const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Channel } = require('../models');
//import signToken function
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (p, { username }) => {
      const params = username ? { username } : {};
      return await User.find(params).populate('channelModel');
    },
    singleChannel: async (p, { channelId }) => {
      return await Channel.findById({ _id: channelId })
        .populate('users')
        .populate({ path: 'messages', populate: { path: 'sender' } });
    },
    channels: async (p, args) => {
      return await Channel.find({})
        .populate('users')
        .populate({ path: 'messages', populate: { path: 'sender' } });
    },
    channelMe: async (p, arg, context) => {
      if (context.user) {
        return await Channel.find({ users: { _id: context.user._id } })
          .populate('users')
          .populate({ path: 'messages', populate: { path: 'sender' } });
      }
      throw new AuthenticationError('Not logged in');
    },
    messages: async (p, args) => {
      return Message.find({}).populate('sender');
    },
    deleteChannels: async (p, args) => {
      return Channel.deleteMany({});
    },
    deleteMessages: async (p, args) => {
      return Message.deleteMany({});
    },
    me: async (p, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('channelModel')
          .populate('friends');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      //jwt token stuff goes here
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return new AuthenticationError('Incorrect Credentials!!');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        return new AuthenticationError('Invalid Credentials');
      }
      //JWT stuff goes here
      const token = signToken(user);
      return { token, user };
    },
    createChannel: async (parent, { users, channelName }, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      console.log('user in auth:', [...users, context.user._id]);
      const channelData = await Channel.create({
        users: [...users, { _id: context.user._id }],
        channelName
      });

      const updatePromises = [...users, { _id: context.user._id }].map((u) =>
        User.findOneAndUpdate(
          { _id: u._id },
          { $push: { channelModel: channelData } },
          { new: true }
        )
      );
      Promise.all(updatePromises).then(console.log).catch(console.error);
      return channelData;
    },
    sendMessage: async (
      parent,
      { channelId, textValue, senderId },
      context
    ) => {
      //we will first create a message get id and then grab the value from the message table
      // senderId will be replaced with current logined
      if (!context.user) throw new AuthenticationError('Not logged in');

      const msgId = await Message.create({
        textValue: textValue,
        sender: senderId
      });
      //we can use the textvalue to update the channel
      return Channel.findByIdAndUpdate(
        { _id: channelId },
        { $push: { messages: msgId } },
        { new: true }
      )
        .populate({ path: 'messages', populate: { path: 'sender' } })
        .populate('users');
      //return Channel.updateOne({_id},{$push:{messages:{}}})
    },
    addFriend: async (p, { user }, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { friends: user } },
        { new: true }
      )
        .select('-__v -password')
        .populate('channelModel')
        .populate('friends');
    },
    createMessage: async (p, args) => {
      return Message.create(args);
    }
  }
};
module.exports = resolvers;
