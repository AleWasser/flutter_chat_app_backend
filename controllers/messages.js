const { response } = require("express");
const Message = require("../models/message");

const getMessages = async (req, res = response) => {
  const user = req.uid;
  const sender = req.params.from;

  const lastMessages = await Message.find({
    $or: [
      {
        from: user,
        to: sender,
      },
      {
        from: sender,
        to: user,
      },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  return res.json({
    ok: true,
    messages: lastMessages,
  });
};

module.exports = {
  getMessages,
};
