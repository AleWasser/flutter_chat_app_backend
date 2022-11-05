const jwt = require("jsonwebtoken");

const generateToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validateToken = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generateToken,
  validateToken,
};
