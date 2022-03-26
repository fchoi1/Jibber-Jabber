//this schema will contain all the messages
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
  {
    textValue: { type: String, trim: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const message = model('message', messageSchema);

module.exports = message;
