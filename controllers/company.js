const companyModel = require("../models/company");

exports.create = async function (req, res, next) {
  try {
    // Create User
    company = await companyModel.create(req.body);

    res.status(201);
    res.json(company);
  } catch (ex) {
    res.status(ex.status || 500);
    res.json({
      status: ex.status || 500,
      message: ex.message,
      validation_errors: ex.validation_errors,
    });
  }
};
