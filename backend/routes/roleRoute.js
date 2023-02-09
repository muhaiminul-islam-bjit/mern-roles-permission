const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roles/roleController");
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)

router
  .route("/")
  .get(roleController.getAllRoles)
  .post(roleController.createRole)
  .delete(roleController.deleteRole);

router
  .route("/pulldown")
  .get(roleController.getRolesForSelect);


module.exports = router;
