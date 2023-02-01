const router = require("express").Router();
const { Register, Login, FindUser } = require("../controllers/UserController");
const Auth = require("../middlewares/AuthenticationMiddleware");

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/find/:id").get(Auth, FindUser);

module.exports = router;
