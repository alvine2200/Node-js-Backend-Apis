const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    convesationId: {
      type: String,
      required: true,
      unique: true,
    },
    messageText: {
      type: String,
      required: true,
      unique: true,
    },
    receiverId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
