/*
 * DEPS
 */
const express                       = require("express");
const port                          = process.env.PORT ? process.env.PORT : 1080;
const app                           = express();
const session                       = require("express-session");
const fs                            = require("fs");
const server                        = process.env.IS_DEV ? require("https") : require("http");


// because we need https on localhost
const options = process.env.IS_DEV ? {
  key: fs.readFileSync('./config/keys/ssl/server.key'),
  cert: fs.readFileSync('./config/keys/ssl/server.cert')
} : {};

/*
 *   CONFIG
 */

require("./config/server.js")(app);
require("./config/db.js");

/*
 *   ROUTES
 */

const accountRoutes                     = require("./routes/account/index.js");
const oauthRoutes                       = require("./routes/oauth/index.js");

app.use("/account", accountRoutes);
app.use("/oauth", oauthRoutes);

/*
 *   START SERVER
 */


server.createServer(options, app).listen(port, () => {
  console.log(`working on ${port}`);
});
