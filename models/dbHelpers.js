const db = require("../data/dbConfig");

const addUser = async (user) => {};

const deleteUser = async (id) => {};

const updateUser = async (id, changes) => {};

const getAllUser = async () => {};

const getUserByUsername = async (username) => {};

const getUserById = async (id) => {};

const addBlog = async (blog, user_id) => {};

const updateBlog = async (id, changes) => {};

const deleteBlog = async (id) => {};

const getAllBlog = async () => {};

const getUsersBlog = async (user_id) => {};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
  getAllUser,
  getUserByUsername,
  getUserById,
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getUsersBlog,
};
