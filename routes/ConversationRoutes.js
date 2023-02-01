const {
  CreateConversation,
  UserConversation,
  SingleConversation,
} = require("../controllers/ConversationController");

const router = require("express").Router();

router.post("/", CreateConversation);
router.get("/find/:id", UserConversation);
router.get("/convo/:id", SingleConversation);

module.exports = router;
