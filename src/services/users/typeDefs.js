import { gql } from 'apollo-server-express'

const typeDefs = gql`
  enum ROLE {
    admin
    student
    company
  }

  type User {
    id: ID
    firstName: String!
    lastName: String
    email: String!
    password: String
    address: String
    phone: Int
    role: ROLE
    level: String
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    address: String
    phone: Int
    role: ROLE
    level: String
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(input: UserInput, id: String!): User
    deleteUser(id: String!): String
  }
`

export default typeDefs
