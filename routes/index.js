var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const connectionController = require("../controllers/connectionController");

/* GET home page. */
router.get("/", userController.getUsers);

router.post("/register", userController.register);
router.post("/server/register", connectionController.register);
router.get("/connection/getConnections", connectionController.getConnections);
router.get(
  "/connection/getConnections/:id/jobs",
  connectionController.getConnection
);

module.exports = router;
