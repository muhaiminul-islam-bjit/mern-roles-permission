const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store/storeController");
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)

// router
//   .route("/")
//   .get(storeController.getAllRoles)
//   .post(storeController.createRole);

router
  .route("/pulldown")
  .get(storeController.getAllStorePulldown);


module.exports = router;