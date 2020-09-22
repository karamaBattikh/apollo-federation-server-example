import { gql } from 'apollo-server'

const typeDefs = gql`
  enum STATUS {
    refuse
    interview
    accept
  }

  type Candidate {
    id: ID
    student: String
    internship: String
    status: STATUS
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
