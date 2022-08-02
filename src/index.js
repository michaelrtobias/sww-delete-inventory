const deleteInventory = require("./lambda/deleteInventory");
exports.handler = async (event) => {
  console.log("event", event);
  let { body } = event;
  body = typeof body === "string" ? JSON.parse(body) : body;
  try {
    const results = await deleteInventory(body);
    let response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
      },
      body: JSON.stringify(results),
    };
    console.log("response:", response);
    return response;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    };
  }
};
