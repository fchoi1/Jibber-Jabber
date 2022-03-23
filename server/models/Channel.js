const { Schema } = require('mongoose');
const MessageSchema = require('./Message');

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [MessageSchema],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Channel = model('Channel', ChannelSchema);

module.exports = Channel;
