const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
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
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("All posts are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.author);
  console.log(contents);
  expect(contents).toContain("Thiago Vasques");
});

test("a valid post can be added", async () => {
  const newBlog = {
    title: "Something in the way she moves",
    author: "Arnaldo Antunes",
    url: "arnaldo.com.br",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.author);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("Arnaldo Antunes");
}, 100000);

test("verify if the id property iw written as id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  console.log(response);
  expect(response.body[0].id).toBeDefined();
});

test("Check if likes is missing and set it to 0", async () => {
  const newBlog = {
    title: "Something in the way she moves",
    author: "Arnaldo Antunes",
    url: "arnaldo.com.br",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  console.log(response.body);
  expect(response.body[response.body.length - 1].likes).toBeDefined();
  expect(response.body[response.body.length - 1].likes).toEqual(0);
});

test("return 400 if post has no title or url", async () => {
  const newBlog = {
    author: "Arnaldo Antunes",
    likes: 10,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
