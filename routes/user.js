/**
 * Load Module Dependencies
 *
 */
const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/", userController.create);

router.get("/", userController.getById);

// router.get("/:id", driverController.get);

// router.put("/:id", restaurantController.updateRestaurant);

// router.delete("/:id", restaurantController.removeRestaurant);

// Expose the Router
module.exports = router;
