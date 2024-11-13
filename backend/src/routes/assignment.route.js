const router = require("express").Router();
const assignmentControllers = require("../api/v1/assignment/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(authenticate, assignmentControllers.find)
  .post(authenticate, assignmentControllers.create);

router
  .route("/:id")
  .get(authenticate, assignmentControllers.findSingle)
  .delete(authenticate, assignmentControllers.destroy);
module.exports = router;
