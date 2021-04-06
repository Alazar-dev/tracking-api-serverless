const AWS = require("aws-sdk");
const moment = require("moment");
const TABLENAME = "drivers";
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

const create = (attributes) => {
  //attributes=JSON.parse(attributes)
  return new Promise((resolve, reject) => {
    const params = {
      TableName: TABLENAME,
      Item: attributes,
    };
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        reject({ code: 400, message: "Could not create file details" });
      } else {
        resolve(params.Item);
      }
    });
  });
};

const getById = (id) => {
  const params = {
    TableName: TABLENAME,
    Key: {
      driver_id: id,
    },
  };

  return new Promise((resolve, reject) => {
    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        reject({ code: 400, message: "Could not get File" });
      } else {
        if (result.Item) {
          resolve(result.Item);
        } else {
          reject({ code: 404, message: { error: "File not found" } });
        }
      }
    });
  });
};
module.exports = {
  create: create,
  getById: getById,
};
