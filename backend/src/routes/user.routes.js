const router = require("express").Router();
const userController = require("../api/v1/user/controllers");
const authenticate = require("../middleware/authenticate");

router.route("/me").get(authenticate, userController.userSelf);
router.route("/").post(userController.create);
router.route("/:id").get(userController.findSingle);

module.exports = router;
