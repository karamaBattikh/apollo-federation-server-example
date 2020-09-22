import { gql } from 'apollo-server'

const typeDefs = gql`
  enum STATUS {
    refuse
    interview
    accept
    untreated
  }

  type Candidate @key(fields: "id") {
    id: ID
    student: User
    internship: Internship
    status: STATUS
  }

  extend type User @key(fields: "id") {
    id: String @external
    candidates: [Candidate]
  }

  extend type Internship @key(fields: "id") {
    id: String @external
    candidates: [Candidate]
  }

  input CandidateInput {
    student: String
    internship: String
    status: STATUS
  }

  type SuccessMessage {
    message: String
  }

  type ErrorsMessage {
    errors: String
  }

  union CandidateResult = Candidate | SuccessMessage | ErrorsMessage

  extend type Query {
    candidates: [Candidate]
    candidate(id: String!): CandidateResult
  }

  extend type Mutation {
    createCandidate(input: CandidateInput): CandidateResult
    updateCandidate(input: CandidateInput, id: String!): CandidateResult
    deleteCandidate(id: String!): String
  }
`

export default typeDefs
