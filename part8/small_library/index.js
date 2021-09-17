const { ApolloServer, UserInputError, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Book = require("./models/bookModel");
const Author = require("./models/authorModel");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((error) => {
    console.log("error connecting to db", error);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]
    id: ID!
  }
  type User {
    username: String!
    password: String!
    favoriteGenre: String
  }
  type token {
    value: String!
  }
  type Query {
    authorsCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    booksCount: Int!
    allBooks: [Book!]!
    findBook(title: String!): Book
    findBooksByAuthor(author: String, genre: String): [Book]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
  }

  type Mutation {
    editAuthor(name: String!, year: Int!): Author
  }
  type Mutation {
    addAuthor(name: String!, born: Int): Author
  }
  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): token
  }
`;

const resolvers = {
  Query: {
    authorsCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    booksCount: () => Book.collection.countDocuments(),
    allBooks: () => Book.find({}),
    findBook: (root, args) => Book.findOne({ title: args.title }),
    findBooksByAuthor: (root, args) => {
      if (args.author && args.genre) {
        return Book.find({ name: args.title, genres: args.genre });
      } else if (args.author) {
        return Book.find({ title: args.title });
      } else {
        return Book.find({ genres: args.genre });
      }
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: (root) => Book.find({}).length,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      //Check if author already exist

      if (!context.currentUser) {
        console.log("unauthorized");
        return null;
      }
      const authorExist = await Author.findOne({ name: args.author });
      if (authorExist) {
        console.log("exists");
      } else {
        console.log("does not exist");
      }

      let book;
      if (authorExist) {
        //new Book object model
        console.log(authorExist);
        book = new Book({ ...args, author: authorExist._id });

        try {
          // save new book obect
          const saved = await book.save();
          return saved;
        } catch (error) {
          console.log(error);
        }
      } else {
        // author does not exist
        const author = new Author({ name: args.author });
        console.log("new author Object", author);
        try {
          //save new author
          const saved = await author.save();
          book = new Book({ ...args, author: saved._id });
          try {
            //save new book with new author id
            const saved = await book.save();
            return saved;
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    editAuthor: (root, args) => {
      if (authors.some((author) => author.name.includes(args.name))) {
        authors = authors.map((author) =>
          author.name === args.name ? { ...author, born: args.year } : author
        );
        return authors.find((author) => author.name === args.name);
      } else {
        return null;
      }
    },
    addAuthor: (root, args) => {
      let author = new Author({ ...args });
      const saved = author.save();
      console.log(saved);
      return saved;
    },
    createUser: async (root, args) => {
      const saltRounds = 10;
      const hash = await bcrypt.hash(args.password, saltRounds);
      const user = new User({
        username: args.username,
        password: hash,
      });
      try {
        return await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidargs: args });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      console.log("user find()", user);
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.password);
      console.log("check password correctness", passwordCorrect);
      if (!(user && passwordCorrect)) {
        throw new UserInputError(error.message, { invalidargs: args });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      console.log("user for token", userForToken);
      const token = jwt.sign(userForToken, process.env.SECRET);
      return { value: token };
    },
    //
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
