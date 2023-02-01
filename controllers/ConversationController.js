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

module.exports = { CreateConversation };
