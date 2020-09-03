import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date
  enum STATUS {
    opened
    closed
  }

  type Internship @key(fields: "id") {
    id: String
    subject: String
    duration: String
    location: String
    level: String
    keyword: String
    description: String
    startDate: Date
    status: STATUS
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
    status: STATUS
    supervisorCompany: String
    supervisorFaculty: String
  }

  extend type User @key(fields: "id") {
    id: String @external
    internshipsParticipated: [Internship]
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
    internship(id: String): Internship
  }

  extend type Mutation {
    createInternship(input: InternshipInput): InternshipResult
    updateInternship(id: String, input: InternshipInput): InternshipResult
    deleteInternship(id: String): InternshipResult
  }
`

export default typeDefs
