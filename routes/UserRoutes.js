const router = require("express").Router();
const { Register, Login } = require("../controllers/UserController");

router.post("/login", Login);
router.post("/register", Register);

module.exports = router;
