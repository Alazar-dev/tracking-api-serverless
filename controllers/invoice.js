const invoiceModel = require("../models/invoice");

exports.create = async function (req, res, next) {
  try {
    // Create User
    invoice = await invoiceModel.create(req.body);

    res.status(201);
    res.json(invoice);
  } catch (ex) {
    res.status(ex.status || 500);
    res.json({
      status: ex.status || 500,
      message: ex.message,
      validation_errors: ex.validation_errors,
    });
  }
};
