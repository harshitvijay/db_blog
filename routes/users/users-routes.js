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
      if (user) {
        res.status(200).send({
          success: true,
          message: "user fetched successfully",
          data: user,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "user not exist with this username",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching user by username",
        data: error,
      });
    });
});

router.get("/id/:id", (req, res) => {
  const { id } = req.params;
  Blogs.getUserById(id)
    .then((user) => {
      if (user) {
        res.status(200).send({
          success: true,
          message: "user fetched successfully",
          data: user,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "user not exist with this id",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching user by id",
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

router.post("/:id/blogs", (req, res) => {
  const { id } = req.params;
  const blog = req.body;
  if (!blog.user_id) {
    blog["user_id"] = parseInt(id, 10);
  }
  Blogs.getUserById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ succes: false, message: "User not exist with this Id" });
      }
      if (user.role === "reader") {
        res
          .status(400)
          .send({ succes: false, message: "Reader cannot add the post" });
      } else {
        blog["status"] =
          user.role === "super admin" ? "published" : "in review";
      }
      // Check for all required field
      if (!(blog.title && blog.content)) {
        res.status(404).send({
          succes: false,
          message: "Must provide both sender and text",
        });
      }
      Blogs.addBlog(blog, id)
        .then((blog) => {
          if (blog) {
            res
              .status(200)
              .send({ succes: true, message: "Blog Added", data: blog });
          }
        })
        .catch((error) => {
          res.status(500).send({
            succes: false,
            message: "Error finding User",
            data: error,
          });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ succes: false, message: "Error Finding user", data: error });
    });
});

router.get("/:id/blogs", (req, res) => {
  const { id } = req.params;
  Blogs.getUsersBlog(id)
    .then((blogs) => {
      res.status(200).send({
        success: true,
        message: "Users Blog Retrived Successfull",
        data: blogs,
      });
    })
    .catch((error) => {
      res.status(500).send({
        succes: false,
        message: "Error Retriving Blogs",
        data: error,
      });
    });
});

module.exports = router;
