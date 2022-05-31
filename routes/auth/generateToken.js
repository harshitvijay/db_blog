const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  const secret = process.env.SECRET;
  const option = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, option);
};
