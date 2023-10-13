const { Users, Blogs } = require("../data");
const { getMutualFriends } = require("../utils/getMutualFriends");

const resolvers = {
  Mutation: {
    // Creating a new Blog
    createBlog: async (parent, args) => {
      const newPost = args.input;
      const lastID = Blogs[Blogs.length - 1].id;
      newPost.id = lastID + 1;
      Blogs.push(args.input);
      return Blogs.find((blog) => blog.id == newPost.id);
    },
  },
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

    // Search using string
    search(parent, { query }) {
      console.log(query);
      const searchResult = Blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query)
      );
      return searchResult;
    },

    // Query the mutual friends between two users
    mutualFriends(parent, { firstUserID, secondUserID }) {
      return getMutualFriends(firstUserID, secondUserID);
    },
  },

  // For fields inside the User
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
