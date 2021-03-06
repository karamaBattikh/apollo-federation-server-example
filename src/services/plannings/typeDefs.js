import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Planning @key(fields: "id") {
    id: ID
    date: Date
    time: String
    duration: String
    note: Int
    reporter: String
    jury: String
    supervisorFaculty: String
    candidate: Candidate @provides(fields: "id")
  }

  extend type Candidate @key(fields: "id") {
    id: ID @external
  }

  input PlanningInput {
    date: Date
    time: String
    duration: String
    note: Int
    reporter: String
    jury: String
    supervisorFaculty: String
    candidate: String
  }

  type SuccessMessage {
    message: String
  }

  type ErrorsMessage {
    errors: String
  }

  union PlanningResult = Planning | SuccessMessage | ErrorsMessage

  extend type Query {
    plannings: [Planning]
    planning(id: ID!): PlanningResult
  }

  extend type Mutation {
    createPlanning(input: PlanningInput): PlanningResult
    updatePlanning(id: ID!, input: PlanningInput): PlanningResult
    deletePlanning(id: ID!): PlanningResult
  }
`
export default typeDefs
