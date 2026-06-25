const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/auth");

const admin =
  require("../middleware/admin");

const {
  getUsers,
  getUserById
} = require(
  "../controllers/user.controller"
);

router.get(
  "/",
  auth,
  admin,
  getUsers
);

router.get(
  "/:id",
  auth,
  admin,
  getUserById
);

module.exports = router;