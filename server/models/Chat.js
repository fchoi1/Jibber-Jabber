const { Schema } = require('mongoose');
const messageSchema = require('./Message');

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [messageSchema],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Channel = model('Channel', ChannelSchema);

module.exports = Channel;
