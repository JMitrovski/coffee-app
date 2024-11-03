const express = require("express");

const router = express.Router();
const {
  getAllCoffees,
  getSingleCoffee,
  checkId,
} = require("../controllers/coffeeController");

router.param("id", checkId);

router.route("/").get(getAllCoffees);
router.route("/:id").get(getSingleCoffee);

module.exports = router;
