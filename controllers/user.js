const userModel = require("../models/user");

exports.create = async function (req, res, next) {
  try {
    // Create User
    user = await userModel.create(req.body);

    res.status(201);
    res.json(user);
  } catch (ex) {
    res.status(ex.status || 500);
    res.json({
      status: ex.status || 500,
      message: ex.message,
      validation_errors: ex.validation_errors,
    });
  }
};

exports.getById = async function (req, res, next) {
  try {
    // Get User
    user = await userModel.get(req.body);

    res.status(201);
    res.json(user);
  } catch (ex) {
    res.status(ex.status || 500);
    res.json({
      status: ex.status || 500,
      message: ex.message,
      validation_errors: ex.validation_errors,
    });
  }
};
