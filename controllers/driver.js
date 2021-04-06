const userModel = require("../models/driver");

exports.create = async function (req, res, next) {
  try {
    // Create User
    driver = await userModel.create(req.body);

    res.status(201);
    res.json(driver);
  } catch (ex) {
    res.status(ex.status || 500);
    res.json({
      status: ex.status || 500,
      message: ex.message,
      validation_errors: ex.validation_errors,
    });
  }
};
