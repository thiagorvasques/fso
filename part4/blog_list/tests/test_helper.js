const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "Some Blog 1",
    author: "Thiago Vasques",
    url: "thiagorvasques.github.io",
    likes: 5,
  },
  {
    title: "Another blog post 2",
    author: "Arnaldo Antunes",
    url: "arnaldo.com.br",
    likes: 10,
  },
  {
    title: "Another blog post 3",
    author: "Arnaldo Antunes",
    url: "arnaldo.com.br",
    likes: 10,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Some Blog",
    author: "Thiago Vasques",
    url: "thiagorvasques.github.io",
    likes: 5,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
