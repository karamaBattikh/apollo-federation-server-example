import { gql } from 'apollo-server'

const typeDefs = gql`
  type Company {
    id: ID!
    name: String
    description: String
    businessManager: String
  }

  input CompanyInput {
    name: String
    description: String
    businessManager: String
  }

  type SuccessMessage {
    message: String
  }

  type ErrorsMessage {
    errors: String
  }

  union CompanyResult = Company | SuccessMessage | ErrorsMessage

  extend type Query {
    companys: [Company]
    company(id: String): CompanyResult
  }

  extend type Mutation {
    createCompany(input: CompanyInput): CompanyResult
    updateCompany(id: String, input: CompanyInput): CompanyResult
    deleteCompany(id: String): CompanyResult
  }
`

export default typeDefs
