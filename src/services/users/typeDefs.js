import { gql } from 'apollo-server'

const typeDefs = gql`
  enum ROLE {
    admin
    student
    company
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
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

  type SuccessMessage {
    message: String
  }

  type ErrorsMessage {
    errors: String
  }

  union UserResult = User | SuccessMessage | ErrorsMessage

  extend type Query {
    users: [User]
    user(id: String!): UserResult
  }

  extend type Mutation {
    createUser(input: UserInput): UserResult
    updateUser(input: UserInput, id: String!): UserResult
    deleteUser(id: String!): String
  }
`

export default typeDefs
