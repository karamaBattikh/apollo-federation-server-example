import { gql } from 'apollo-server-express'

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

  type Query {
    internships: [Internship]
    internship(id: String): Internship
  }

  type Mutation {
    createInternship(input: InternshipInput): Internship
    updateInternship(id: String, input: InternshipInput): Internship
    deleteInternship(id: String): String
  }
`

export default typeDefs
