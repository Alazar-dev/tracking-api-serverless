const orderModel = require("../models/order");

exports.create = async function (req, res, next) {
  try {
    // Create User
    order = await orderModel.create(req.body);

    res.status(201);
    res.json(order);
  } catch (ex) {
    res.status(ex.status || 500);
    res.json({
      status: ex.status || 500,
      message: ex.message,
      validation_errors: ex.validation_errors,
    });
  }
};
