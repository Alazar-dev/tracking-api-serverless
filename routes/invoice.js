/**
 * Load Module Dependencies
 *
 */
const express = require("express");

const invoiceController = require("../controllers/invoice");

const router = express.Router();

router.post("/", invoiceController.create);

// router.get("/", restaurantController.getCollection);

// router.get("/:id", driverController.get);

// router.put("/:id", restaurantController.updateRestaurant);

// router.delete("/:id", restaurantController.removeRestaurant);

// Expose the Router
module.exports = router;
