const { Schema, model } = require('mongoose');
const ReactionSchema = require('./reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'Please say something'],
      minlength: [1, 'Thought must be at least 1 character'],
      maxlength: [280, 'Thought must be less than 280 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      }
    }
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
