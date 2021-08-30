const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  if (blogList.length === 1) {
    return blogList[0].likes;
  } else {
    const reducer = (a, b) => {
      return { likes: a.likes + b.likes };
    };
    const total = blogList.reduce(reducer, { likes: 0 });
    return total.likes;
  }
};

const favoriteBlog = (blogList) => {
  if (blogList.length === 1) {
    return blogList[0].likes;
  } else {
    const reducer = (a, b) => {
      return {
        title: a.likes > b.likes ? a.title : b.title,
        author: a.likes > b.likes ? a.author : b.author,
        likes: a.likes > b.likes ? a.likes : b.likes,
      };
    };
    const total = blogList.reduce(reducer, { likes: 0 });
    return total;
  }
};

const mostBlogs = (blogList) => {
  const object = _.countBy(blogList, "author");
  return Object.keys(object).reduce((a, b) => (a > b ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
