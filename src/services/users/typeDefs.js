import { gql } from 'apollo-server'

const typeDefs = gql`
  enum ROLE {
    faculty_manager
    student
    company_manager
  }

  enum LEVEL {
    engineer
    license
    professional_master
    research_master
  }

  type User @key(fields: "id") {
    id: ID
    firstName: String
    lastName: String
    email: String!
    address: String
    phone: Int
    role: ROLE
    level: LEVEL
    companyName: String
    facultyName: String
    description: String
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String!
    address: String
    phone: Int
    role: ROLE
    level: LEVEL
    companyName: String
    facultyName: String
    description: String
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
    user(id: ID!): UserResult
  }

  extend type Mutation {
    createUser(input: UserInput): UserResult
    updateUser(input: UserInput, id: ID!): UserResult
    deleteUser(id: ID!): String
  }
`

export default typeDefs
