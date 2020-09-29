import { gql } from 'apollo-server'

const typeDefs = gql`
  enum STATUS {
    refuse
    interview
    accept
    untreated
    final_acceptance
  }

  type Candidate @key(fields: "id") {
    id: ID
    student: User @provides(fields: "id")
    internship: Internship @provides(fields: "id")
    status: STATUS
  }

  extend type User @key(fields: "id") {
    id: ID @external
    candidates: [Candidate]
  }

  extend type Internship @key(fields: "id") {
    id: ID @external
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
    candidate(id: ID!): CandidateResult
  }

  extend type Mutation {
    createCandidate(input: CandidateInput): CandidateResult
    updateCandidate(input: CandidateInput, id: ID!): CandidateResult
    deleteCandidate(id: ID!): CandidateResult
  }
`

export default typeDefs
