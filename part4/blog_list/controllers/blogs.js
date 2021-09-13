const blogRoutes = require("express").Router();

const Blog = require("../models/blog");

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

  if (
    body.title === undefined ||
    body.url === undefined ||
    body.title === "" ||
    body.author === "" ||
    body.url === ""
  ) {
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

blogRoutes.post("/:id/comments", async (request, response) => {
  const body = request.body;
  console.log("Request.body", body);
  if (body.comment === "") {
    response.status(400).json({ error: "content missing" });
  } else {
    const blog = await Blog.findById(request.params.id);
    console.log("blog returned by findbyid", blog.toJSON());
    const toSave = new Blog({
      _id: request.params.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.like,
      user: blog.user,
      comments: blog.comments.concat(body.comment),
    });
    const saved = await Blog.findByIdAndUpdate(request.params.id, toSave);
    response.status(204).json(saved);
  }
});

module.exports = blogRoutes;
