const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Some Blog",
    author: "Thiago Vasques",
    url: "thiagorvasques.github.io",
    likes: 5,
  },
  {
    title: "Another blog post",
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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
