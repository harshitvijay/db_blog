const db = require("../data/dbConfig");

const addUser = async (user) => {
  return await db("users").insert(user, ["id", "username"]);
};

const deleteUser = async (id) => {
  return await db("users").where({ id }).del();
};

const getUserById = async (id) => {
  return await db("users").where({ id }).first();
};

const updateUser = async (id, changes) => {
  return await db("users")
    .where({ id })
    .update(changes)
    .then(async () => {
      return await getUserById(id);
    });
};

const getAllUser = async () => {
  return await db("users");
};

const getUserByUsername = async (username) => {
  const data = await db("users").where({ username }).first();
  return await db("users").where({ username }).first();
};

const addBlog = async (blog, user_id) => {
  return await db("blogs").where({ user_id }).insert(blog, ["id"]);
};

const getBlogById = async (id) => {
  return await db("blogs").where({ id }).first();
};

const updateBlog = async (id, changes) => {
  return await db("blogs")
    .where({ id })
    .update(changes)
    .then(async () => {
      return await getBlogById(id);
    });
};

const deleteBlog = async (id) => {
  return await db("blogs").where({ id }).del();
};

const getAllBlog = async () => {
  return await db("blogs");
};

const getUsersBlog = async (user_id) => {
  return await db("users as u")
    .join("blogs as b", "u.id", "m.user_id")
    .select(
      "u.id as userID",
      "u.name as name",
      "u.username as  userName",
      "u.role as userRole",
      "b.id as blogId",
      "b.title as blogTitle",
      "b.content as blogContent",
      "b.status as blogStatus",
      "b.created_at as blogCreatedAt"
    )
    .where({ user_id });
};

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
  getBlogById,
};
