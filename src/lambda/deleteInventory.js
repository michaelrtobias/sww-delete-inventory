const deleteItem = require("../dynamodb/deleteItem");
const formatParams = (body) => {
  let params = {};
  const keys = Object.keys(body);
  keys.forEach((key) => {
    params[key] = {
      S: body[key],
    };
  });

  return params;
};

module.exports = async (body) => {
  let params = {
    Key: formatParams(body),
  };
  const result = await deleteItem(params, "watchInventory");
  return result;
};
