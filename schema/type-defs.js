const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    nationality: Nationality!
    age: Int!
    friends: [User]
    blogs: [Blog]
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    isPosted: Boolean!
    user: ID
  }


  type Query {
    users: [User!]!
    user(id: ID!): User!
    blogs: [Blog!]!
    blog(id: ID!): Blog!
    search(query: String): [Blog]
    mutualFriends(firstUserID: ID!, secondUserID: ID!): [User!]!
  }

  type Mutation {
  createBlog(input: CreateBlogInput!): Blog!
  }

  input CreateBlogInput {
  title: String!
  content: String!
  isPosted: Boolean!
  user: ID = 999
  }
  type Mutation {
    createBlog(input: CreateBlogInput!): Blog!
  }

  enum Nationality {
    SAUDIARABIAN
    INDIAN
    AMERICAN
    GERMAN
    NEPALI
  }
`;

module.exports = { typeDefs };
