const router = require("express").Router();
const authControllers = require("../api/v1/auth");

router.post("/login/local", authControllers.localLogin);

module.exports = router;
