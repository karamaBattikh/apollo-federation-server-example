import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Planning {
    id: ID
    date: Date
    time: String
    duration: String
    reporter: String
    jury: String
    note: Int
  }

  input PlanningInput {
    date: Date
    time: String
    duration: String
    reporter: String
    jury: String
    note: Int
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
    planning(id: String!): PlanningResult
  }

  extend type Mutation {
    createPlanning(input: PlanningInput): PlanningResult
    updatePlanning(id: String!, input: PlanningInput): PlanningResult
    deletePlanning(id: String!): PlanningResult
  }
`
export default typeDefs
