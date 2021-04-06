const db = require("./db");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const tus = require("tus-node-server");
const EVENTS = require("tus-node-server").EVENTS;
const IS_OFFLINE = process.env.IS_OFFLINE;
const secret = process.env.IS_OFFLINE ? require("./secrets") : {};
const { jwtVerify } = require("./security");
const { base64_decode } = require("./JWT");

const driverRoute = require("./routes/driver");
const userRoute = require("./routes/user");
const companyRoute = require("./routes/company");
const orderRoute = require("./routes/order");
const invoiceRoute = require("./routes/invoice");

app.get("/", (req, res) => {
  res.send("T1-File-Storage Serverless APP");
});
app.use(bodyParser.json({ strict: false }));

const authenticateRequests = (req, res, next) => {
  jwtVerify(req.headers)
    .then((decodedData) => {
      req.decodedData = decodedData;
      next();
    })
    .catch((err) => {
      res.status(401).json({ message: "Unauthorized!" });
    });
};

app.use(authenticateRequests);

// tracking Endpoint
app.use("/driver", driverRoute);
app.use("/user", userRoute);
app.use("/campany", companyRoute);
app.use("/order", orderRoute);
app.use("/invoice", invoiceRoute);

app.post("/driver", (req, res) => {
  let resp = driverController.create(req.body);
  res.json(resp);
  console.log(req.body);
  db.createFileDetails(req.body + "")
    .then((fileDetails) => {
      res.json(fileDetails);
    })
    .catch((error) => {
      res.status(error.code).json(error);
    });
});

module.exports.handler = serverless(app);
