const express = require("express");
const Blogs = require("../../models/dbHelpers");
const asyncLib = require("async");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let usersBlogs = [];
    const blogs = await Blogs.getAllBlog();
    asyncLib.each(
      blogs,
      async (blog) => {
        const blogUser = await Blogs.getUserById(blog.user_id);
        usersBlogs.push({
          userId: blogUser.id,
          name: blogUser.name,
          username: blogUser.username,
          role: blogUser.role,
          blogId: blog.id,
          blogTitle: blog.title,
          blogContent: blog.content,
          blogStatus: blog.status,
          blogCreatedAt: blog.created_at,
        });
      },
      (error) => {
        if (error) {
          res.status(500).send({
            success: false,
            msg: "Error in getting users blog",
            data: error,
          });
        } else {
          res.status(200).send({
            success: true,
            msg: "Blogs with user details",
            data: usersBlogs,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Blogs.deleteBlog(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).send({
          succes: true,
          message: `Blog with id ${id} sucessfully deleted`,
        });
      } else {
        res.status(404).send({ success: false, message: `Invalid Id` });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error Deleting Blog",
        data: error,
      });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Blogs.updateBlog(id, changes)
    .then((blog) => {
      if (blog) {
        res.status(200).send({
          succes: true,
          message: "Blog Update successful",
          data: blog,
        });
      } else {
        res.status(404).send({
          succes: false,
          message: "Blog not exist with this id",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        succes: false,
        message: "Blog Update unsuccesfull",
        data: error,
      });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  Blogs.getBlogById(id)
    .then((blog) => {
      if (blog) {
        Blogs.getUserById(blog.user_id).then((user) => {
          if (user) {
            res.status(200).send({
              success: true,
              message: "Blog with id  retrived successfully",
              data: { blog, user },
            });
          }
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Blog not found with this id",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching lesson",
        data: error,
      });
    });
});

module.exports = router;
