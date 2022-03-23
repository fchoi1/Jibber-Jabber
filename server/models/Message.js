const { Schema } = require('mongoose');

const MessageSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  textContent: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  }
});

module.exports = MessageSchema;
