const { Users, Blogs } = require("../data");

const resolvers = {
  Query: {
    // Users
    users() {
      return Users;
    },

    user(parent, args) {
      return Users.find((user) => user.id == args.id);
    },

    // Blogs
    blogs() {
      return Blogs;
    },

    blog(parent, args) {
      return Blogs.find((blog) => blog.id == args.id);
    },

    search(parent, { query }) {
      console.log(query);
      const searchResult = Blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query)
      );
      return searchResult;
    },
  },

  User: {
    friends: () => {
      return Users.filter((user) => user.id > 3);
    },
    blogs: (parent) => {
      return Blogs.filter((blog) => blog.user == parent.id)
    }
  },
};

module.exports = { resolvers };
