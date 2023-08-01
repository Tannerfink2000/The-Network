const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Reaction body is required'],
      maxlength: [280, 'Maximum length is 280 characters']
    },
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    }
  }
);

module.exports = ReactionSchema;
