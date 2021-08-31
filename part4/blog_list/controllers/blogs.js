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

blogRoutes.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRoutes.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRoutes.put("/:id", async (request, response) => {
  const body = request.body;
  console.log(body.title);
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updated);
});

module.exports = blogRoutes;
