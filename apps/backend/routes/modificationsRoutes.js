const express = require("express");

const router = express.Router();
const {
  getAllModifications,
} = require("../controllers/modificationsController");

router.route("/").get(getAllModifications);

module.exports = router;
