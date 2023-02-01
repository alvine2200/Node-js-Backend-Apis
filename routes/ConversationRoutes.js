const { CreateConversation } = require("../controllers/ConversationController");

const router = require("express").Router();

router.post("/", CreateConversation);

module.exports = router;
