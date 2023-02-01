const Conversation = require("../models/ConversationModel");

const CreateConversation = async (req, res) => {
  try {
    const receiverId = req.body;
    const currentUserId = req.user.userId;

    const isConversationAlreadyCreated = await Conversation.findOne({
      members: { $all: [receiverId, currentUserId] },
    });
    if (isConversationAlreadyCreated) {
      return res
        .status(400)
        .json({ status: "success", message: "Conversation exists" });
    } else {
      await Conversation.create({ members: [receiverId, currentUserId] });
      return res
        .status(201)
        .json({ status: "success", message: "Conversation created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(201).json({
      status: "failed",
      message: "Error occured...",
      error: error,
    });
  }
};

const UserConversation = async (req, res) => {
  try {
    if (req.user.userId == req.params.id) {
      const currentUser = req.user.userId;
      const convo = await Conversation.find({
        members: { $in: [currentUser] },
      });
      return res.status(200).json({
        status: "success",
        msg: "Conversation fetched",
        data: convo,
      });
    } else {
      return res.status(500).json({
        status: "failed",
        msg: "You can only get your conversation",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      msg: "error ocurred while trying to fetch",
      error: error,
    });
  }
};

const SingleConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const conversation = await Conversation.findById(conversationId);
    if (conversation.members.includes(req.user.userId)) {
      return res.status(200).json({
        status: "success",
        msg: "Conversation fetched",
        data: conversation,
      });
    } else {
      return res.status(403).json({
        status: "failed",
        msg: "You are not included in this conversation",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      msg: "error occured",
      error: error,
    });
  }
};

module.exports = { CreateConversation, UserConversation, SingleConversation };
