const router = require("express").Router();
const taskControllers = require("../api/v1/task/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, taskControllers.findUsersTasks)
  .post(authenticate, taskControllers.create);
router
  .route("/:id")
  .get(authenticate, taskControllers.findSingle)
  .patch(authenticate, taskControllers.edit)
  .delete(authenticate, taskControllers.destroy);

module.exports = router;
