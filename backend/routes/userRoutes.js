const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const hasPermission = require("../middleware/hasPermission");
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)

router
  .route("/")
  .get(hasPermission("viewUser"), usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
router.route("/getById").get(usersController.getUserById);

module.exports = router;
