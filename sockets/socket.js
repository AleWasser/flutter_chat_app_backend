const { validateToken } = require("../helpers/jwt");
const { io } = require("../index");
const {
  userConnected,
  userDisconnected,
  storeMessage,
} = require("../controllers/socket");

io.on("connection", (client) => {
  const [validToken, uid] = validateToken(client.handshake.headers["x-token"]);

  if (!validToken) {
    return client.disconnect();
  }

  userConnected(uid);

  client.join(uid);

  client.on("private-message", async (payload) => {
    await storeMessage(payload);
    io.to(payload.to).emit("private-message", payload);
  });

  client.on("disconnect", () => {
    userDisconnected(uid);
  });
});
