const { Users, Blogs } = require("../data");
const { getMutualFriends } = require("../utils/getMutualFriends");

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

    mutualFriends(parent, { firstUserID, secondUserID }) {
      return getMutualFriends(firstUserID, secondUserID);
    },
  },

  User: {
    friends: (parent) => {
      return Users.filter((user) => parent.friends.includes(user.id));
    },

    blogs: (parent) => {
      return Blogs.filter((blog) => blog.user == parent.id);
    },
  },
};

module.exports = { resolvers };
