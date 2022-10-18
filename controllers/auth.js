const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateToken } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateToken(user.id);

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "An error occurred",
    });
  }
};

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    const token = await generateToken(user.id);

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "An error occurred",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const user = await User.findById(uid);
  const token = await generateToken(user.id);

  return res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
