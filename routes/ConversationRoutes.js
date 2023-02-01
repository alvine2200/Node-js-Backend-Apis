const {
  CreateConversation,
  UserConversation,
  SingleConversation,
} = require("../controllers/ConversationController");
const {
  SendMessage,
  GetMessages,
} = require("../controllers/MessageController");

const router = require("express").Router();

router.post("/", CreateConversation);
router.get("/find/:id", UserConversation);
router.get("/convo/:id", SingleConversation);
router.post("/create/message", SendMessage);
router.get("/get/message", GetMessages);

module.exports = router;
