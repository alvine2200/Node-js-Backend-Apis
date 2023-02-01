const ConversationModel = require("../models/ConversationModel");
const Message = require("../models/MessageModel");

const SendMessage = async (req, res) => {
  try {
    const { messageText, conversationId } = req.body;
    const convo = await ConversationModel.findById({ _id: conversationId });
    if (!convo) {
      return res.status(500).json({
        status: "failed",
        msg: "No such conversation id",
        error: error,
      });
    }
    const message = await Message.create({
      messageText: messageText,
      senderId: req.user.userId,
      convesationId: conversationId,
    });
    return res.status(200).json({
      status: "success",
      msg: "Message sent",
      data: message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      msg: "error occured",
      error: error,
    });
  }
};

const GetMessages = async (req, res) => {
  try {
    const { conversationId } = req.params.id;
    const messages = await Message.find({ conversationId: conversationId });
    if (messages) {
      return res.status(200).json({
        status: "success",
        msg: "Messages fetched",
        data: messages,
      });
    }
    return res.status(500).json({
      status: "failed",
      msg: "No messages found, create conversations first",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      msg: "error occured",
      error: error,
    });
  }
};

module.exports = { SendMessage, GetMessages };
