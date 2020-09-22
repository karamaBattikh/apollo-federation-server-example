import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  enum STATUS_INTERNSHIP {
    opened
    closed
  }

  type Internship @key(fields: "id") {
    id: ID
    subject: String
    duration: String
    level: String
    keyword: String
    description: String
    startDate: Date
    status: STATUS_INTERNSHIP
    supervisorCompany: String
    supervisorFaculty: String
  }

  input InternshipInput {
    subject: String
    duration: String
    location: String
    level: String
    keyword: String
    description: String
    startDate: Date
    status: STATUS_INTERNSHIP
    supervisorCompany: String
    supervisorFaculty: String
  }

  type SuccessMessage {
    message: String
  }

  type ErrorsMessage {
    errors: String
  }

  union InternshipResult = Internship | SuccessMessage | ErrorsMessage

  extend type Query {
    internships: [Internship]
    internship(id: ID!): InternshipResult
  }

  extend type Mutation {
    createInternship(input: InternshipInput): InternshipResult
    updateInternship(id: ID!, input: InternshipInput): InternshipResult
    deleteInternship(id: ID!): InternshipResult
  }
`

export default typeDefs
