const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String
    authors: [Strings]
    description: String
    title: String
    image: String
    link: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBook: [Book]
}
type Query {
    me: User
}
input bookData {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [Strings]
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInfo: bookData) : User
    removeBook(bookId: String): User
}
type Auth {
    token: String
    user: User
}`;

module.exports = typeDefs;