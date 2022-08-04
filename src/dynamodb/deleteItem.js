const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

module.exports = async function (params, tableName) {
  const ddb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    region: "us-east-1",
  });

  params["TableName"] = tableName;
  params["ReturnValues"] = "ALL_OLD";

  const deletedItem = await ddb.deleteItem(params).promise();

  const unmarshalledQuery = AWS.DynamoDB.Converter.unmarshall(
    deletedItem.Attributes
  );
  return unmarshalledQuery;
};
