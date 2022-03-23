const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
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

module.exports = messageSchema;
