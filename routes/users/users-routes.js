const express = require("express");
const Blogs = require("../../models/dbHelpers");

const router = express.Router();

router.get("/", async (req, res) => {
  Blogs.getAllUser()
    .then((users) => {
      res.status(200).send({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching users",
        data: error,
      });
    });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  Blogs.getUserByUsername(username)
    .then((user) => {
      res.status(200).send({
        success: true,
        message: "user fetched successfully",
        data: user,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching user bu username",
        data: error,
      });
    });
});

router.get("/?id", (req, res) => {
  const { id } = req.query;
  Blogs.getUserById(id)
    .then((user) => {
      res.status(200).send({
        success: true,
        message: "user fetched successfully",
        data: user,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching user bu username",
        data: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Blogs.deleteUser(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).send({
          success: true,
          message: "User deleted successfully",
          data: count,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "User not exist with this id",
        });
      }
    })
    .catch((error) => {
      res.status(200).send({
        success: false,
        message: "Error in deleting user",
        data: error,
      });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Blogs.updateUser(id, changes)
    .then((user) => {
      if (user) {
        res.status(200).send({
          succes: true,
          message: "User Update successful",
          data: user,
        });
      } else {
        res.status(404).send({
          succes: false,
          message: "User not exist with this id",
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ succes: false, message: "Update unsuccesfull", data: error });
    });
});

module.exports = router;
