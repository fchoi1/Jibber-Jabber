const { Schema } = require('mongoose');
const messageSchema = require('./Message');

const ChatSchema = new Schema({
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

const Chat = model('Chat', ChatSchema);

module.exports = Chat;
