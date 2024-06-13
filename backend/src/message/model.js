const mongoose = require("mongoose");
user = "./users.js";
const messagesSchema = mongoose.Schema({
  smsId: {
    primary_key: true,
    type: Number,
    require: true,
  },
  sender_email: {
    type: String,
    require: true,
  },
  receiver_email: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  read: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    user_Id: {
      type: Number,
      require: true,
    },
  },
});

module.exports = mongoose.model("message", messagesSchema);
