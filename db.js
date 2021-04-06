const AWS = require("aws-sdk");
const moment = require("moment");
const FILESTORE = "filestore";
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

const createFileDetails = (attributes) => {
  //attributes=JSON.parse(attributes)
  return new Promise((resolve, reject) => {
    if (
      !attributes.fileId ||
      !attributes.date ||
      !attributes.userId ||
      !attributes.fileName ||
      !attributes.fileType
    ) {
      reject({ code: 400, message: "Missing Parameters" });
    } else {
      const params = {
        TableName: FILESTORE,
        Item: {
          fileId: attributes.fileId,
          date: attributes.date,
          userId: attributes.userId,
          fileName: attributes.fileName,
          fileType: attributes.fileType,
        },
      };
      dynamoDb.put(params, (error) => {
        if (error) {
          console.log(error);
          reject({ code: 400, message: "Could not create file details" });
        } else {
          resolve(params.Item);
        }
      });
    }
  });
};

const getFileById = (fileId) => {
  const params = {
    TableName: FILESTORE,
    Key: {
      fileId: fileId,
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
  createFileDetails: createFileDetails,
  getFileById: getFileById,
};
