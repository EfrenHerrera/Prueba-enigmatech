const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        firstName: String!
        lastName: String!
    }
    type AuthData {
        id: ID!
        token: String!
        tokenExpiration: Int!
    }
    input UserInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
    }
    type RootQuery {
        login(email: String!, password: String!): AuthData!
    }
    type RootMutation {
        userCreate(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);