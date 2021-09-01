const blogRoutes = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  blogs.map((blog) => blog.toJSON());
  response.json(blogs);
});

blogRoutes.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Content missing" });
  } else if (body.likes === undefined) {
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const saved = await blog.save();
  user.blogs = user.blogs.concat(saved._id);
  await user.save();
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
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    console.log(blog.user.toString());
    console.log(blog);
    if (blog.user.toString() === user.id) {
      console.log("match");
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response
        .status(401)
        .json({ error: "logged user id does not match with author id." });
    }
  } else {
    response.status(404).end();
  }
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
