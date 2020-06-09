import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Internship {
    id: ID!
    title: String
    duration: String
    location: String
    level: String
    keyword: String
    description: String
    startDate: Date
  }

  input InternshipInput {
    title: String
    duration: String
    location: String
    level: String
    keyword: String
    description: String
    startDate: Date
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
    internship(id: String): InternshipResult
  }

  extend type Mutation {
    createInternship(input: InternshipInput): InternshipResult
    updateInternship(id: String, input: InternshipInput): InternshipResult
    deleteInternship(id: String): InternshipResult
  }
`

export default typeDefs
