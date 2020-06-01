import { gql } from 'apollo-server-express'

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

  type Query {
    plannings: [Planning]
    planning(id: String!): Planning
  }

  type Mutation {
    createPlanning(input: PlanningInput): Planning
    updatePlanning(id: String!, input: PlanningInput): Planning
    deletePlanning(id: String!): String
  }
`
export default typeDefs
