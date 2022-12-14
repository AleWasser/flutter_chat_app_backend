const path = require("path");
const express = require("express");
require("dotenv").config();

//* DB config
const { dbConnection } = require("./database/config");
dbConnection();

//* Express config
const app = express();
app.use(express.json());

//* Server config
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

//* Path config
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//* Routes
app.use("/api/login", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/users", require("./routes/users"));

server.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log(`Server running on port: ${process.env.PORT}`);
});
