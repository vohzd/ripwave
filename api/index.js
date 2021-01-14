const express                           = require("express");
const app                               = express();

require("./config/server.js")(app);
require("./config/db.js");

const routes                            = require("./routes/index.js");

app.use("/", routes);

module.exports = {
  path: "/api",
  handler: app
}
