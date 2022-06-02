const express = require("express");
const Blogs = require("../../models/dbHelpers");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");

const router = express.Router();

router.post("/register", (req, res) => {
  const userObj = req.body;
  let { username, password, role, security_que, security_ans } = userObj;

  if (!(username && password && role && security_que && security_ans)) {
    res.status(404).send({
      success: false,
      message:
        "Username,Password,Role,Security Question and Answer are  required",
    });
  }
  const hashPassword = bcrypt.hashSync(userObj.password, 12);
  const hashSecQue = bcrypt.hashSync(userObj.security_que, 12);
  const hashSecAns = bcrypt.hashSync(userObj.security_ans, 12);
  userObj.password = hashPassword;
  userObj.security_que = hashSecQue;
  userObj.security_ans = hashSecAns;
  Blogs.addUser(userObj)
    .then((user) => {
      res.status(200).send({
        success: true,
        message: "User added",
        data: user,
      });
    })
    .catch((error) => {
      if (error.errno == 19) {
        res.status(400).send({
          success: false,
          message: "username already taken",
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Error in adding user",
          data: error,
        });
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(404).send({
      success: false,
      message: "Username and Password required",
    });
  }
  Blogs.getUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).send({
          success: true,
          message: "Login sucessfull",
          token,
          data: {
            userId: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
          },
        });
      } else {
        res.status(401).send({
          success: false,
          message: "Invalid Credential",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "server error",
        data: error,
      });
    });
});

router.post("/2fa", (req, res) => {
  const { username, security_que, security_ans } = req.body;
  if (!(username && security_que && security_ans)) {
    res.status(404).send({
      success: false,
      message: "Username Security Question and Answer  are required",
    });
  }
  Blogs.getUserByUsername(username)
    .then((user) => {
      if (
        user &&
        bcrypt.compareSync(security_que, user.security_que) &&
        bcrypt.compareSync(security_ans, user.security_ans)
      ) {
        const token = generateToken(user);
        res.status(200).send({
          success: true,
          message: "Login sucessfull",
          token,
          data: {
            userId: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
          },
        });
      } else {
        res.status(401).send({
          success: false,
          message: "Please enter correct security question and answer",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "server error",
        data: error,
      });
    });
});

module.exports = router;
