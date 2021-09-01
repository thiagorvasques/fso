const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const blog = require("../models/blog");

const api = supertest(app);
let token


beforeEach(async () => {
  //get user token
  const userToLog = {
    username: "admin",
    password: "admin"
  };
  const response = await api
      .post('/api/login')
      .send(userToLog)
      token = response.body.token
      //console.log(token);
})

describe('check logged user requests', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      //console.log('cleared')

      helper.initialBlogs.forEach(async (blog) => {
      let blogObject = new Blog(blog)
      await blogObject.save()
      //console.log('saved')
  })
 // console.log('done')
})

   test("blogs are returned as json", async () => {
        await api
        .get('/api/blogs')
        .set({Authorization: `bearer ${token}`})
        .expect(200)
        .expect("Content-type", /application\/json/)

   })
   test('all post are returned', async () => {
        const blogs = await Blog.find({})
        console.log(blogs);
        // blogs.map((u) => u.toJSON())
        // expect(blogs).toHaveLength(helper.initialBlogs.length)
   })
   test("a specific blog is within the returned blogs", async () => {
    const response = await api
    .get('/api/blogs')
    .set({Authorization: `bearer ${token}`})
     const contents = response.body.map((b) => b.author)
     expect(contents).toContain("Thiago Vasques");
  });

  test('a valid post can be added', async () => {
    const newBlog = {
          title: "Something in the way she moves",
          author: "Arnaldo Antunes",
          url: "arnaldo.com.br",
          likes: 10,
        };

       await api
      .post("/api/blogs")
      .set({Authorization: `bearer ${token}`})
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

      const response = await api
      .get('/api/blogs')
      .set({Authorization: `bearer ${token}`})

    const contents = response.body.map((r) => r.author);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("Arnaldo Antunes");
  }, 100000);

  test("verify if the id property is written as id instead of _id", async () => {
    const response = await api
    .get('/api/blogs')
    .set({Authorization: `bearer ${token}`})

    expect(response.body[0].id).toBeDefined();
  })
  test("Check if likes is missing and set it to 0", async () => {
    const newBlog = {
      title: "Something in the way she moves",
      author: "Arnaldo Antunes",
      url: "arnaldo.com.br",
    };
    await api
      .post("/api/blogs")
      .set({Authorization: `bearer ${token}`})
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

      const response = await api
      .get('/api/blogs')
      .set({Authorization: `bearer ${token}`})

    expect(response.body[response.body.length - 1].likes).toBeDefined();
    expect(response.body[response.body.length - 1].likes).toEqual(0);
  });

    test("return 400 if post has no title or url", async () => {
    const newBlog = {
      author: "Arnaldo Antunes",
      likes: 10,
    };
    await api
      .post("/api/blogs")
      .set({Authorization: `bearer ${token}`})
      .send(newBlog).expect(400);

    const response = await api
    .get('/api/blogs')
    .set({Authorization: `bearer ${token}`})

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 100000);

})


describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "admin",
      name: "admin",
      password: "admin",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("creation fails if password has no more than 2 characteres", async () => {
    const newUser = {
      username: "Thiago Vasques",
      name: "Thiago ribeiro",
      password: "sa",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(403)
      .expect("Content-type", /application\/json/);

    expect(result.body.error).toContain(
      "Password must have more than 3 characteres"
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
