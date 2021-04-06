/**
 * Load Module Dependencies
 *
 */
const express = require("express");

const driverController = require("../controllers/driver");

const router = express.Router();

router.post("/", driverController.create);

// router.get("/", restaurantController.getCollection);

// router.get("/:id", driverController.get);

// router.put("/:id", restaurantController.updateRestaurant);

// router.delete("/:id", restaurantController.removeRestaurant);

// Expose the Router
module.exports = router;
