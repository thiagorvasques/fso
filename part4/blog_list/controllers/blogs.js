const blogRoutes = require("express").Router();
const Blog = require("../models/blog");

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  blogs.map((blog) => blog.toJSON());
  response.json(blogs);
});

blogRoutes.post("/", async (request, response) => {
  const body = request.body;
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Content missing" });
  } else if (body.likes === undefined) {
    body.likes = 0;
  }
  const blog = new Blog(body);
  const saved = await blog.save();
  response.status(200).json(saved);
});

module.exports = blogRoutes;
